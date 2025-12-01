import "./styles.css";
import { updateCartBadge } from "./cart/cartBadge.js";
import { updateHeaderUserState } from "./ui/header.js";
import { renderMapPage } from "./ui/renderMapPage.js";
import { renderArgentinaMap } from "./ui/renderArgentinaMap.js";

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

function initMapPage() {
  const mapPage = renderMapPage();
  if (mapPage && mapPage.canvasElement) {
    renderArgentinaMap(mapPage.canvasElement);
  }
  updateHeaderUserState();
  updateCartBadge();
  const observeFadeIn = setupFadeInAnimations();
  observeFadeIn();
}

initMapPage();

export { initMapPage };
