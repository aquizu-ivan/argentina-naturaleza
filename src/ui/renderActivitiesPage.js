import { renderHeader } from "./header.js";

// Mantener sincronizado con los valores de region y difficulty de src/data/activitiesData.js
const ACTIVITY_REGIONS = ["Patagonia", "Centro", "Litoral", "Noroeste"];
const ACTIVITY_DIFFICULTIES = ["Suave", "Media", "Baja"];

export function renderActivitiesPage() {
  const app = document.querySelector("#app");
  if (!app) return;

  const regionOptions = ACTIVITY_REGIONS.map(
    (region) => `<option value="${region}">${region}</option>`
  ).join("");

  const difficultyOptions = ACTIVITY_DIFFICULTIES.map(
    (difficulty) => `<option value="${difficulty}">${difficulty}</option>`
  ).join("");

  app.innerHTML = `
    <div class="page page--list">
      ${renderHeader("activities")}
      <main>
        <section id="actividades" class="content fade-in">
          <h1>Actividades al aire libre</h1>
          <p>Yoga, meditaci\u00f3n y movimiento para reconectar con la naturaleza.</p>
          <div class="trails__search">
            <fieldset class="filters-panel">
              <legend>Filtros de actividades</legend>
              <div class="filters-row">
                <div class="filters-group">
                  <label for="activitySearch">Buscar actividad</label>
                  <input
                    id="activitySearch"
                    type="text"
                    placeholder="Buscar actividad..."
                  />
                </div>

                <div class="filters-group">
                  <label for="activityRegionFilter">Regi\u00f3n</label>
                  <select id="activityRegionFilter" class="filter-select">
                    <option value="">Todas las regiones</option>
                    ${regionOptions}
                  </select>
                </div>

                <div class="filters-group">
                  <label for="activityDifficultyFilter">Dificultad</label>
                  <select id="activityDifficultyFilter" class="filter-select">
                    <option value="">Todas las dificultades</option>
                    ${difficultyOptions}
                  </select>
                </div>
              </div>
              <button
                type="button"
                class="filters-clear"
                id="activitiesClearFiltersButton"
              >
                Limpiar filtros
              </button>
            </fieldset>
          </div>
          <p
            class="results-info"
            id="activitiesResultsInfo"
            role="status"
            aria-live="polite"
          ></p>
          <div id="activitiesGrid" class="trails__grid"></div>
        </section>
      </main>

      <footer class="footer">
        <span>Naturaleza Argentina \u2013 Proyecto personal de Iv\u00e1n Aquizu</span>
        <div class="footer__links">
          <span>\u00a9 2025 \u2013 Inspirado en la naturaleza de Argentina</span>
        </div>
      </footer>
    </div>
  `;
}
