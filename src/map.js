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
  const loaderElement = document.querySelector(".map__loader");
  const placeholderElement = document.querySelector(".map__canvas-placeholder");
  const pulseElement = document.querySelector(".map__pulse");
  const liveRegionElement = document.getElementById("mapExperiencesLiveRegion");

  const setLiveRegionMessage = function (message) {
    if (!liveRegionElement) return;
    liveRegionElement.textContent = message;
  };

  const renderVisibleExperiencesList = function (experiences) {
    if (!listContentElement) return;
    listContentElement.innerHTML = "";

    if (!experiences.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state map-list__empty fade-in";

      const title = document.createElement("p");
      title.textContent = "No hay experiencias visibles con este filtro.";

      const hint = document.createElement("p");
      hint.textContent = "Probá activar caminatas o actividades, o ajustar los filtros.";

      empty.append(title, hint);
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

  const showMapLoader = function (message) {
    if (!loaderElement) return;
    loaderElement.textContent = message;
    loaderElement.hidden = false;
  };

  const hideMapLoader = function () {
    if (loaderElement) loaderElement.hidden = true;
    if (pulseElement) pulseElement.classList.add("is-active");
    if (placeholderElement) placeholderElement.hidden = true;
  };

  if (canvasElement) {
    try {
      renderArgentinaMap(canvasElement);
      showMapLoader("Preparando el territorio…");
      const markers = buildMapMarkers();
      let lastActiveMarker = null;
      const clearActiveMarker = function () {
        if (lastActiveMarker) {
          lastActiveMarker.classList.remove("map__marker--active");
          lastActiveMarker = null;
        }
      };
      const setActiveMarker = function (element) {
        if (!element) return;
        if (lastActiveMarker && lastActiveMarker !== element) {
          lastActiveMarker.classList.remove("map__marker--active");
        }
        lastActiveMarker = element;
        lastActiveMarker.classList.add("map__marker--active");
      };
      const { showTooltip, hideTooltip } = createMapTooltip(canvasElement, {
        onClose() {
          clearActiveMarker();
        }
      });

      const { markerElements } = renderMapMarkers(canvasElement, markers, {
        onMarkerClick(marker, element, options = {}) {
          if (options.focusTooltip) {
            setActiveMarker(element);
            const typeLabel = marker.type === "trail" ? "caminata" : "actividad";
            const regionLabel = marker.region || "Argentina";
            setLiveRegionMessage(`Se seleccionó ${marker.title}, ${typeLabel}, región ${regionLabel}.`);
          }
          showTooltip(marker, element, { focus: Boolean(options.focusTooltip) });
        }
      });

      function applyTypeFilters() {
        const showTrails =
          trailToggleElement?.getAttribute("aria-pressed") === "true" || trailToggleElement === null;
        const showActivities =
          activityToggleElement?.getAttribute("aria-pressed") === "true" || activityToggleElement === null;

        updateMarkersVisibility(markerElements, { showTrails, showActivities });
        hideTooltip({ restoreFocus: false });
        clearActiveMarker();
        setLiveRegionMessage("Selección de marcador limpiada. Mostrando experiencias según filtros actuales.");

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
      hideMapLoader();

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
    } catch (error) {
      console.error(error);
      showMapLoader("Algo no respondió como esperábamos. Podés recargar el territorio.");
      setLiveRegionMessage("No pudimos cargar el mapa. Probá recargar la página.");
    }
  }
  updateHeaderUserState();
  updateCartBadge();
  const observeFadeIn = setupFadeInAnimations();
  observeFadeIn();
}

initMapPage();

export { initMapPage };