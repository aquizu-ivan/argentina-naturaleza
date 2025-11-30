export function renderTrailsPage() {
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
          <a class="nav__link nav__link--active" href="/caminatas.html">Caminatas</a>
          <a class="nav__link" href="/activities.html">Actividades</a>
        </nav>
      </header>

      <main>
        <section id="caminatas" class="content">
          <h1>Caminatas destacadas</h1>
          <p>Busc\u00e1 y explor\u00e1 senderos para planear tu pr\u00f3xima salida.</p>
          <div class="trails__search">
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
