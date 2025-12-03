import "./styles.css";
import { updateCartBadge } from "./cart/cartBadge.js";
import { trailsData } from "./data/trailsData.js";
import { renderTrailsPage } from "./ui/renderTrailsPage.js";
import { renderTrailCards } from "./ui/renderTrailCards.js";
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

renderTrailsPage(trailsData);
const observeFadeIn = setupFadeInAnimations();
updateHeaderUserState();

const searchInput = document.getElementById("trailSearch");
const regionSelect = document.getElementById("trailRegionFilter");
const difficultySelect = document.getElementById("trailDifficultyFilter");
const resultsInfo = document.getElementById("trailsResultsInfo");
const clearFiltersButton = document.getElementById("trailsClearFiltersButton");

function renderFilteredTrails(trails) {
  renderTrailCards(trails);
  updateCartBadge();
  observeFadeIn();
}

const { update } = setupListFilters({
  searchInput,
  regionSelect,
  difficultySelect,
  resultsInfoElement: resultsInfo,
  getAllItems: function () {
    return trailsData;
  },
  applyFilterLogic: function (items, filters) {
    return filterTrails(items, filters);
  },
  onResultsChange: renderFilteredTrails,
  labels: {
    singular: "caminata",
    plural: "caminatas"
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
