import "./styles.css";
import { updateCartBadge } from "./cart/cartBadge.js";
import { updateHeaderUserState } from "./ui/header.js";
import { renderMapPage } from "./ui/renderMapPage.js";
import { renderArgentinaMap } from "./ui/renderArgentinaMap.js";
import {
  buildMapMarkers,
  renderMapMarkers,
  updateMarkersVisibility
} from "./ui/mapMarkers.js";
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
  const trailToggleElement = mapPage ? mapPage.trailToggleElement : null;
  const activityToggleElement = mapPage ? mapPage.activityToggleElement : null;
  const emptyStateElement = mapPage ? mapPage.emptyStateElement : null;

  if (canvasElement) {
    renderArgentinaMap(canvasElement);

    const markers = buildMapMarkers();
    const { showTooltip, hideTooltip } = createMapTooltip(canvasElement);

    const { markerElements } = renderMapMarkers(canvasElement, markers, {
      onMarkerClick(marker, element) {
        showTooltip(marker, element);
      }
    });

    function applyTypeFilters() {
      const showTrails =
        trailToggleElement?.getAttribute("aria-pressed") === "true" || trailToggleElement === null;
      const showActivities =
        activityToggleElement?.getAttribute("aria-pressed") === "true" ||
        activityToggleElement === null;

      updateMarkersVisibility(markerElements, { showTrails, showActivities });
      hideTooltip();

      const hasVisibleMarkers = markerElements.some(function (entry) {
        const element = entry?.element || entry;
        return element && !element.classList.contains("map__marker--hidden");
      });

      if (emptyStateElement) {
        emptyStateElement.hidden = hasVisibleMarkers;
      }
    }

    const setToggleState = function (button, isPressed) {
      if (!button) return;
      button.setAttribute("aria-pressed", String(isPressed));
      button.classList.toggle("map__toggle--active", isPressed);
    };

    if (trailToggleElement) {
      trailToggleElement.addEventListener("click", function () {
        const nextState = trailToggleElement.getAttribute("aria-pressed") !== "true";
        setToggleState(trailToggleElement, nextState);
        applyTypeFilters();
      });
    }

    if (activityToggleElement) {
      activityToggleElement.addEventListener("click", function () {
        const nextState = activityToggleElement.getAttribute("aria-pressed") !== "true";
        setToggleState(activityToggleElement, nextState);
        applyTypeFilters();
      });
    }

    applyTypeFilters();

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
