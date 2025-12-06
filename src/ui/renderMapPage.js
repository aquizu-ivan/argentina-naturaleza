import { renderHeader } from "./header.js";

export function renderMapPage(root = document.querySelector("#app")) {
  if (!root) return null;

  root.innerHTML = `
    <div class="page page--map">
      ${renderHeader("map")}
      <main>
        <section class="content content--light map-page fade-in">
          <div class="map-page__header">
            <h1>Mapa interactivo de experiencias</h1>
            <p class="map-page__intro">
              Explora las caminatas y actividades de Naturaleza Argentina en un mapa interactivo.
            </p>
            <p class="map-page__intro map-page__hint">
              C\u00f3mo usar este mapa: us\u00e1 los botones para mostrar caminatas o actividades, seleccion\u00e1 un punto en el mapa para ver detalles y revis\u00e1 la lista de experiencias visibles debajo.
            </p>
            <a href="#mapExperiencesList" class="map-skip-link">
              Saltar al listado de experiencias
            </a>
          </div>

          <p
            id="mapExperiencesLiveRegion"
            class="sr-only"
            role="status"
            aria-live="polite"
          ></p>

          <section class="map__controls" aria-label="Controles del mapa">
            <h2 class="sr-only">Controles del mapa</h2>
            <div class="map__filters" aria-label="Filtros de mapa">
              <button
                type="button"
                id="mapToggleTrails"
                class="map__toggle map__toggle--active"
                aria-pressed="true"
                aria-controls="mapCanvasRegion mapExperiencesList"
              >
                <span class="map__toggle-visual" aria-hidden="true"></span>
                <span class="map__toggle-label">Mostrar caminatas</span>
              </button>
              <button
                type="button"
                id="mapToggleActivities"
                class="map__toggle map__toggle--active"
                aria-pressed="true"
                aria-controls="mapCanvasRegion mapExperiencesList"
              >
                <span class="map__toggle-visual" aria-hidden="true"></span>
                <span class="map__toggle-label">Mostrar actividades</span>
              </button>
            </div>

            <div class="map__legend" aria-label="Leyenda del mapa">
              <span class="map__badge map__badge--trail">Caminatas</span>
              <span class="map__badge map__badge--activity">Actividades</span>
            </div>
          </section>

          <section
            class="map__canvas"
            id="mapCanvasRegion"
            role="region"
            aria-label="Mapa interactivo de experiencias en Argentina"
          >
            <h2 class="sr-only">Mapa de experiencias</h2>
            <div class="map__canvas-placeholder">Ac\u00e1 va el mapa (Bloque C/D)</div>
          </section>
          <p class="map__empty-state" role="status" aria-live="polite" hidden>
            No hay experiencias para los filtros seleccionados.
          </p>
          <section
            class="map-list"
            role="region"
            id="mapExperiencesList"
            aria-labelledby="mapExperiencesListTitle"
          >
            <h2 class="map-list__title" id="mapExperiencesListTitle">
              Experiencias visibles en el mapa
            </h2>
            <div class="map-list__content"></div>
          </section>
        </section>
      </main>

      <footer class="footer">
        <span>Naturaleza Argentina - Proyecto personal de Ivan Aquizu</span>
        <div class="footer__links">
          <span>\u00a9 2025 - Inspirado en la naturaleza de Argentina</span>
        </div>
      </footer>
    </div>
  `;

  const canvasElement = root.querySelector(".map__canvas");
  const legendElement = root.querySelector(".map__legend");
  const trailsToggle = root.querySelector("#mapToggleTrails");
  const activitiesToggle = root.querySelector("#mapToggleActivities");
  const emptyStateElement = root.querySelector(".map__empty-state");
  const listContentElement = root.querySelector(".map-list__content");

  return {
    canvasElement,
    legendElement,
    trailToggleElement: trailsToggle,
    activityToggleElement: activitiesToggle,
    emptyStateElement,
    listContentElement,
    filters: {
      trailsToggle,
      activitiesToggle
    }
  };
}
