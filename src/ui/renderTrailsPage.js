import { renderHeader } from "./header.js";

export function renderTrailsPage() {
  const app = document.querySelector("#app");
  if (!app) return;

  app.innerHTML = `
    <div class="page page--list">
      ${renderHeader("trails")}
      <main>
        <section id="caminatas" class="content fade-in">
          <h1>Caminatas destacadas</h1>
          <p>Busc\u00e1 y explor\u00e1 senderos para planear tu pr\u00f3xima salida.</p>
          <div class="trails__search">
            <label class="sr-only" for="trailSearch">Buscar caminata</label>
            <input
              id="trailSearch"
              type="text"
              placeholder="Buscar caminata..."
            />
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
