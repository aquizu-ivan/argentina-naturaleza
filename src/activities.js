import "./styles.css";
import { updateCartBadge } from "./cart/cartBadge.js";
import { activitiesData } from "./data/activitiesData.js";
import { renderActivitiesPage } from "./ui/renderActivitiesPage.js";
import { renderActivityCards } from "./ui/renderActivityCards.js";
import { filterActivities } from "./ui/filterActivities.js";
import { setupListFilters } from "./ui/listFilters.js";
import { updateHeaderUserState } from "./ui/header.js";

function setupFadeInAnimations() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const markVisible = function () {
    document.querySelectorAll(".fade-in:not(.visible)").forEach(function (el) {
      el.classList.add("visible");
    });
  };
  if (prefersReducedMotion) {
    markVisible();
    return markVisible;
  }
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
const activitiesGrid = document.getElementById("activitiesGrid");

function showActivitiesLoading(message) {
  if (!activitiesGrid) return;
  activitiesGrid.classList.add("is-loading");
  activitiesGrid.innerHTML = `<div class="list-loader" role="status" aria-live="polite">${message}</div>`;
}

function renderFilteredActivities(activities) {
  showActivitiesLoading("Actualizando actividades...");
  renderActivityCards(activities);
  activitiesGrid?.classList.remove("is-loading");
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
    return filterActivities(items, filters);
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