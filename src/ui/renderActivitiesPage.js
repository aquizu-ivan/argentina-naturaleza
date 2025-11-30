import { renderHeader } from "./header.js";

export function renderActivitiesPage() {
  const app = document.querySelector("#app");
  if (!app) return;

  app.innerHTML = `
    <div class="page page--list">
      ${renderHeader("activities")}
      <main>
        <section id="actividades" class="content fade-in">
          <h1>Actividades al aire libre</h1>
          <p>Yoga, meditaci\u00f3n y movimiento para reconectar con la naturaleza.</p>
          <div class="trails__search">
            <label class="sr-only" for="activitySearch">Buscar actividad</label>
            <input
              id="activitySearch"
              type="text"
              placeholder="Buscar actividad..."
            />
          </div>
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
