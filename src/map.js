import "./styles.css";
import { updateCartBadge } from "./cart/cartBadge.js";
import { updateHeaderUserState } from "./ui/header.js";
import { renderMapPage } from "./ui/renderMapPage.js";
import { renderArgentinaMap } from "./ui/renderArgentinaMap.js";
import { buildMapMarkers, renderMapMarkers } from "./ui/mapMarkers.js";
import { createMapTooltip } from "./ui/mapTooltip.js";

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
  const canvasElement = mapPage ? mapPage.canvasElement : null;

  if (canvasElement) {
    renderArgentinaMap(canvasElement);

    const markers = buildMapMarkers();
    const { showTooltip, hideTooltip } = createMapTooltip(canvasElement);

    renderMapMarkers(canvasElement, markers, {
      onMarkerClick(marker, element) {
        showTooltip(marker, element);
      }
    });

    canvasElement.addEventListener("click", function (event) {
      const isMarker = event.target.closest(".map__marker");
      const isTooltip = event.target.closest(".map__tooltip");
      if (!isMarker && !isTooltip) {
        hideTooltip();
      }
    });

    document.addEventListener("click", function (event) {
      const clickedInsideCanvas = canvasElement.contains(event.target);
      const isMarker = event.target.closest(".map__marker");
      const isTooltip = event.target.closest(".map__tooltip");
      if (!clickedInsideCanvas && !isMarker && !isTooltip) {
        hideTooltip();
      }
    });
  }
  updateHeaderUserState();
  updateCartBadge();
  const observeFadeIn = setupFadeInAnimations();
  observeFadeIn();
}

initMapPage();

export { initMapPage };
