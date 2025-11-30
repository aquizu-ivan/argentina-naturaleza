import "./styles.css";
import { updateHeaderUserState } from "./ui/header.js";
import { renderTrailDetailPage } from "./ui/renderTrailDetailPage.js";

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

const params = new URLSearchParams(window.location.search);
const trailId = params.get("id");

renderTrailDetailPage(trailId);
const observeFadeIn = setupFadeInAnimations();
observeFadeIn();
updateHeaderUserState();
