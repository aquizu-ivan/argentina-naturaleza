import "./styles.css";
import { activitiesData } from "./data/activitiesData.js";
import { renderActivitiesPage } from "./ui/renderActivitiesPage.js";
import { renderActivityCards } from "./ui/renderActivityCards.js";
import { filterTrails } from "./ui/filterTrails.js";

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
renderActivityCards(activitiesData);
const observeFadeIn = setupFadeInAnimations();

const searchInput = document.getElementById("activitySearch");

if (searchInput) {
  searchInput.addEventListener("input", function (event) {
    const text = event.target.value;
    const filtered = filterTrails(activitiesData, text);
    renderActivityCards(filtered);
    observeFadeIn();
  });
}
