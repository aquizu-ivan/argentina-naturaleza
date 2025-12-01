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
          <p>Busc\u00e1 y explor\u00e1 senderos para planear tu pr\u00f3xima salida.</p>
          <div class="trails__search">
            <div class="filters">
              <label class="sr-only" for="trailSearch">Buscar caminata</label>
              <input
                id="trailSearch"
                type="text"
                placeholder="Buscar caminata..."
              />

              <label class="sr-only" for="trailRegionFilter">Filtrar por regi\u00f3n</label>
              <select id="trailRegionFilter" class="filter-select">
                <option value="">Todas las regiones</option>
                ${regionOptions}
              </select>

              <label class="sr-only" for="trailDifficultyFilter">Filtrar por dificultad</label>
              <select id="trailDifficultyFilter" class="filter-select">
                <option value="">Todas las dificultades</option>
                ${difficultyOptions}
              </select>
            </div>
          </div>
          <div id="trailsGrid" class="trails__grid"></div>
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
