import "./styles.css";
import { updateCartBadge } from "./cart/cartBadge.js";
import { activitiesData } from "./data/activitiesData.js";
import { renderActivitiesPage } from "./ui/renderActivitiesPage.js";
import { renderActivityCards } from "./ui/renderActivityCards.js";
import { filterTrails } from "./ui/filterTrails.js";
import { setupListFilters } from "./ui/listFilters.js";
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
const resultsInfo = document.getElementById("activitiesResultsInfo");
const clearFiltersButton = document.getElementById("activitiesClearFiltersButton");

function renderFilteredActivities(activities) {
  renderActivityCards(activities);
  updateCartBadge();
  observeFadeIn();
}

const { update } = setupListFilters({
  searchInput,
  regionSelect,
  difficultySelect,
  resultsInfoElement: resultsInfo,
  getAllItems: function () {
    return activitiesData;
  },
  applyFilterLogic: function (items, filters) {
    return filterTrails(items, filters);
  },
  onResultsChange: renderFilteredActivities,
  labels: {
    singular: "actividad",
    plural: "actividades"
  }
});

if (clearFiltersButton) {
  clearFiltersButton.addEventListener("click", function () {
    if (searchInput) searchInput.value = "";
    if (regionSelect) regionSelect.value = "";
    if (difficultySelect) difficultySelect.value = "";

    if (typeof update === "function") {
      update();
    }
  });
}
