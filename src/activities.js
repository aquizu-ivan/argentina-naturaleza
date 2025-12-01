import "./styles.css";
import { updateCartBadge } from "./cart/cartBadge.js";
import { activitiesData } from "./data/activitiesData.js";
import { renderActivitiesPage } from "./ui/renderActivitiesPage.js";
import { renderActivityCards } from "./ui/renderActivityCards.js";
import { filterTrails } from "./ui/filterTrails.js";
import { updateHeaderUserState } from "./ui/header.js";

function setupFadeInAnimations() {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  const observeTargets = function () {
    document.querySelectorAll(".fade-in:not(.visible)").forEach(function (el) {
      observer.observe(el);
    });
  };

  observeTargets();
  return observeTargets;
}

renderActivitiesPage();
const observeFadeIn = setupFadeInAnimations();
updateHeaderUserState();

const searchInput = document.getElementById("activitySearch");
const regionSelect = document.getElementById("activityRegionFilter");
const difficultySelect = document.getElementById("activityDifficultyFilter");

function applyActivityFilters() {
  const filters = {
    searchText: searchInput ? searchInput.value : "",
    region: regionSelect ? regionSelect.value : "",
    difficulty: difficultySelect ? difficultySelect.value : ""
  };

  const filteredActivities = filterTrails(activitiesData, filters);
  renderActivityCards(filteredActivities);
  updateCartBadge();
  observeFadeIn();
}

if (searchInput) {
  searchInput.addEventListener("input", applyActivityFilters);
}

if (regionSelect) {
  regionSelect.addEventListener("change", applyActivityFilters);
}

if (difficultySelect) {
  difficultySelect.addEventListener("change", applyActivityFilters);
}

applyActivityFilters();
