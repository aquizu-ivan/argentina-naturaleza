import "./styles.css";
import { updateCartBadge } from "./cart/cartBadge.js";
import { updateHeaderUserState } from "./ui/header.js";
import { renderMapPage } from "./ui/renderMapPage.js";
import { renderArgentinaMap } from "./ui/renderArgentinaMap.js";
import {
  buildMapMarkers,
  renderMapMarkers,
  updateMarkersVisibility,
  getVisibleExperiences
} from "./ui/mapMarkers.js";
import { createMapTooltip } from "./ui/mapTooltip.js";

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

function initMapPage() {
  const mapPage = renderMapPage();
  const canvasElement = mapPage ? mapPage.canvasElement : null;
  const trailToggleElement = mapPage ? mapPage.trailToggleElement : null;
  const activityToggleElement = mapPage ? mapPage.activityToggleElement : null;
  const emptyStateElement = mapPage ? mapPage.emptyStateElement : null;
  const listContentElement = mapPage ? mapPage.listContentElement : null;
  const liveRegionElement = document.getElementById("mapExperiencesLiveRegion");

  const updateMapExperiencesLiveRegion = function ({ total, hikesCount, activitiesCount }) {
    if (!liveRegionElement) return;
    let message = "";

    if (total === 0) {
      message =
        "No hay experiencias visibles en el mapa. Ajustá los filtros para ver resultados.";
    } else if (hikesCount > 0 && activitiesCount > 0) {
      message = `Se muestran ${total} experiencias en el mapa: ${hikesCount} caminatas y ${activitiesCount} actividades.`;
    } else if (hikesCount > 0) {
      message = `Se muestran ${hikesCount} caminatas en el mapa.`;
    } else if (activitiesCount > 0) {
      message = `Se muestran ${activitiesCount} actividades en el mapa.`;
    }

    liveRegionElement.textContent = message;
  };

  const renderVisibleExperiencesList = function (experiences) {
    if (!listContentElement) return;
    listContentElement.innerHTML = "";

    if (!experiences.length) {
      const empty = document.createElement("p");
      empty.className = "map-list__empty";
      empty.textContent = "No hay experiencias visibles en el mapa con los filtros actuales.";
      listContentElement.appendChild(empty);
      return;
    }

    const list = document.createElement("ul");
    list.className = "map-list__items";

    experiences.forEach(function (experience) {
      const item = document.createElement("li");
      item.className = "map-list__item";

      const title = document.createElement("strong");
      const typeLabel = experience.type === "caminata" ? "Caminata" : "Actividad";
      title.textContent = `${typeLabel}: ${experience.name}`;

      const details = document.createElement("div");
      const difficultyText = experience.difficulty ? ` · Dificultad: ${experience.difficulty}` : "";
      details.textContent = `Región: ${experience.region || "Argentina"}${difficultyText}`;

      const link = document.createElement("a");
      link.className = "map-list__link";
      link.href = experience.detailUrl;
      link.textContent = "Ver detalle";

      item.append(title, details, link);
      list.appendChild(item);
    });

    listContentElement.appendChild(list);
  };

  if (canvasElement) {
    renderArgentinaMap(canvasElement);

    const markers = buildMapMarkers();
    let lastActiveMarker = null;
    const { showTooltip, hideTooltip } = createMapTooltip(canvasElement, {
      onClose() {
        if (lastActiveMarker) {
          const target = lastActiveMarker;
          lastActiveMarker = null;
          target.focus();
        }
      }
    });

    const { markerElements } = renderMapMarkers(canvasElement, markers, {
      onMarkerClick(marker, element, options = {}) {
        if (options.focusTooltip) {
          lastActiveMarker = element;
        } else {
          lastActiveMarker = null;
        }
        showTooltip(marker, element, { focus: Boolean(options.focusTooltip) });
      }
    });

    function applyTypeFilters() {
      const showTrails =
        trailToggleElement?.getAttribute("aria-pressed") === "true" || trailToggleElement === null;
      const showActivities =
        activityToggleElement?.getAttribute("aria-pressed") === "true" ||
        activityToggleElement === null;

      updateMarkersVisibility(markerElements, { showTrails, showActivities });
      hideTooltip({ restoreFocus: false });
      lastActiveMarker = null;

      const visibleExperiences = getVisibleExperiences(markerElements);
      renderVisibleExperiencesList(visibleExperiences);

      const hasVisibleMarkers = visibleExperiences.length > 0;
      const hikesCount = visibleExperiences.filter(function (item) {
        return item.type === "caminata";
      }).length;
      const activitiesCount = visibleExperiences.filter(function (item) {
        return item.type === "actividad";
      }).length;

      if (emptyStateElement) {
        emptyStateElement.hidden = hasVisibleMarkers;
      }

      updateMapExperiencesLiveRegion({
        total: visibleExperiences.length,
        hikesCount,
        activitiesCount
      });
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
