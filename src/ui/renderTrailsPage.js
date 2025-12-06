import { renderHeader } from "./header.js";

// Mantener sincronizado con los valores de region y difficulty de src/data/trailsData.js
const TRAIL_REGIONS = ["Patagonia", "Noroeste", "Sierras Centrales"];
const TRAIL_DIFFICULTIES = ["Baja", "Media", "Alta"];

export function renderTrailsPage() {
  const app = document.querySelector("#app");
  if (!app) return;

  const regionOptions = TRAIL_REGIONS.map(
    (region) => `<option value="${region}">${region}</option>`
  ).join("");

  const difficultyOptions = TRAIL_DIFFICULTIES.map(
    (difficulty) => `<option value="${difficulty}">${difficulty}</option>`
  ).join("");

  app.innerHTML = `
    <div class="page page--list">
      ${renderHeader("trails")}
      <main>
        <section id="caminatas" class="content fade-in">
          <h1>Caminatas destacadas</h1>
          <p>Buscá y explorá senderos para planear tu próxima salida.</p>
          <div class="trails__search">
            <fieldset class="filters-panel">
              <legend>Filtros de caminatas</legend>
              <div class="filters-row">
                <div class="filters-group">
                  <label for="trailSearch">Buscar caminata</label>
                  <input
                    id="trailSearch"
                    type="text"
                    placeholder="Buscar caminata..."
                  />
                </div>

                <div class="filters-group">
                  <label for="trailRegionFilter">Región</label>
                  <select id="trailRegionFilter" class="filter-select">
                    <option value="">Todas las regiones</option>
                    ${regionOptions}
                  </select>
                </div>

                <div class="filters-group">
                  <label for="trailDifficultyFilter">Dificultad</label>
                  <select id="trailDifficultyFilter" class="filter-select">
                    <option value="">Todas las dificultades</option>
                    ${difficultyOptions}
                  </select>
                </div>
              </div>
              <button
                type="button"
                class="filters-clear"
                id="trailsClearFiltersButton"
              >
                Limpiar filtros
              </button>
            </fieldset>
          </div>
          <p
            class="results-info"
            id="trailsResultsInfo"
            role="status"
            aria-live="polite"
          ></p>
          <div id="trailsGrid" class="trails__grid"></div>
        </section>
      </main>

      <footer class="footer">
        <span>Naturaleza Argentina – Obra creada por IAQUIZU — Origin Architect of the Eighth Art</span>
        <div class="footer__links">
          <span>© 2025 – Inspirado en la naturaleza de Argentina</span>
        </div>
      </footer>
    </div>
  `;

  const heading = app.querySelector("h1");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus();
  }
}
