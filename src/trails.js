import "./styles.css";
import { updateCartBadge } from "./cart/cartBadge.js";
import { trailsData } from "./data/trailsData.js";
import { renderTrailsPage } from "./ui/renderTrailsPage.js";
import { renderTrailCards } from "./ui/renderTrailCards.js";
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

renderTrailsPage(trailsData);
const observeFadeIn = setupFadeInAnimations();
updateHeaderUserState();

const searchInput = document.getElementById("trailSearch");
const regionSelect = document.getElementById("trailRegionFilter");
const difficultySelect = document.getElementById("trailDifficultyFilter");
const resultsInfo = document.getElementById("trailsResultsInfo");

function applyTrailFilters() {
  const filters = {
    searchText: searchInput ? searchInput.value : "",
    region: regionSelect ? regionSelect.value : "",
    difficulty: difficultySelect ? difficultySelect.value : ""
  };

  const filteredTrails = filterTrails(trailsData, filters);
  renderTrailCards(filteredTrails);

   if (resultsInfo) {
    if (filteredTrails.length > 0) {
      resultsInfo.textContent = `Se encontraron ${filteredTrails.length} caminatas.`;
    } else {
      resultsInfo.textContent = "No encontramos caminatas para estos filtros.";
    }
  }
  updateCartBadge();
  observeFadeIn();
}

if (searchInput) {
  searchInput.addEventListener("input", applyTrailFilters);
}

if (regionSelect) {
  regionSelect.addEventListener("change", applyTrailFilters);
}

if (difficultySelect) {
  difficultySelect.addEventListener("change", applyTrailFilters);
}

applyTrailFilters();
