import "./styles.css";
import { updateHeaderUserState } from "./ui/header.js";
import { renderActivityDetailPage } from "./ui/renderActivityDetailPage.js";

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

const params = new URLSearchParams(window.location.search);
const activityId = params.get("id");

renderActivityDetailPage(activityId);
const observeFadeIn = setupFadeInAnimations();
observeFadeIn();
updateHeaderUserState();
