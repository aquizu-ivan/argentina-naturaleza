export function renderActivitiesPage() {
  const app = document.querySelector("#app");
  if (!app) return;

  app.innerHTML = `
    <div class="page">
      <header class="topbar">
        <div class="brand">
          <span class="brand__dot"></span>
          <span class="brand__text">Naturaleza Argentina</span>
        </div>
        <nav class="nav">
          <a class="nav__link" href="/">Inicio</a>
          <a class="nav__link" href="/caminatas.html">Caminatas</a>
          <a class="nav__link nav__link--active" href="/activities.html">Actividades</a>
        </nav>
      </header>

      <main>
        <section id="actividades" class="content">
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
        <div class="brand brand--small">
          <span class="brand__dot"></span>
          <span class="brand__text">Naturaleza Argentina</span>
        </div>
        <div class="footer__links">
          <span>Simulaci\u00f3n de flujo de trabajo</span>
        </div>
      </footer>
    </div>
  `;
}
