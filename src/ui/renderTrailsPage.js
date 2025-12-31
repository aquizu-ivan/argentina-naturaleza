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
        <a href="#caminatas" class="skip-link">Saltar al contenido principal</a>
        <section id="caminatas" class="content fade-in">
          <h1>Caminatas destacadas</h1>
          <p>Busc\u00e1 y explor\u00e1 senderos para planear tu pr\u00f3xima salida.</p>
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
                  <label for="trailRegionFilter">Regi\u00f3n</label>
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

                  <footer class="footer footer--editorial">
        <p class="footer__line">Naturaleza Argentina &mdash; Obra creada por IAQUIZU &mdash; &copy; 2025 IAQUIZU &mdash; Todos los derechos reservados.</p>
      </footer>
    </div>
  `;

  const heading = app.querySelector("h1");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus();
  }
}
