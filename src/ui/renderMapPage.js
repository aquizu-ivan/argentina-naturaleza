import { renderHeader } from "./header.js";

export function renderMapPage(root = document.querySelector("#app")) {
  if (!root) return null;

  root.innerHTML = `
    <div class="page page--map">
      ${renderHeader("map")}
      <main>
        <section class="content content--light map-page fade-in">
          <div class="map-page__header">
            <h1>Mapa de experiencias</h1>
            <p class="map-page__intro">
              Explora las caminatas y actividades de Naturaleza Argentina en un mapa interactivo.
            </p>
          </div>

          <div class="map__controls">
            <div class="map__filters" aria-label="Filtros de mapa">
              <button
                type="button"
                id="mapToggleTrails"
                class="map__toggle map__toggle--active"
                aria-pressed="true"
              >
                <span class="map__toggle-visual" aria-hidden="true"></span>
                <span class="map__toggle-label">Mostrar caminatas</span>
              </button>
              <button
                type="button"
                id="mapToggleActivities"
                class="map__toggle map__toggle--active"
                aria-pressed="true"
              >
                <span class="map__toggle-visual" aria-hidden="true"></span>
                <span class="map__toggle-label">Mostrar actividades</span>
              </button>
            </div>

            <div class="map__legend" aria-label="Leyenda del mapa">
              <span class="map__badge map__badge--trail">Caminatas</span>
              <span class="map__badge map__badge--activity">Actividades</span>
            </div>
          </div>

          <div class="map__canvas">
            <div class="map__canvas-placeholder">Aqui va el mapa (Bloque C/D)</div>
          </div>
          <p class="map__empty-state" role="status" aria-live="polite" hidden>
            No hay experiencias para los filtros seleccionados.
          </p>
        </section>
      </main>

      <footer class="footer">
        <span>Naturaleza Argentina - Proyecto personal de Ivan Aquizu</span>
        <div class="footer__links">
          <span>(c) 2025 - Inspirado en la naturaleza de Argentina</span>
        </div>
      </footer>
    </div>
  `;

  const canvasElement = root.querySelector(".map__canvas");
  const legendElement = root.querySelector(".map__legend");
  const trailsToggle = root.querySelector("#mapToggleTrails");
  const activitiesToggle = root.querySelector("#mapToggleActivities");
  const emptyStateElement = root.querySelector(".map__empty-state");

  return {
    canvasElement,
    legendElement,
    trailToggleElement: trailsToggle,
    activityToggleElement: activitiesToggle,
    emptyStateElement,
    filters: {
      trailsToggle,
      activitiesToggle
    }
  };
}
