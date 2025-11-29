import { createTrailCard } from "./createTrailCard.js";

export function renderApp(trailsData) {
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
          <a class="nav__link nav__link--active" href="#inicio">Inicio</a>
          <a class="nav__link" href="#caminatas">Caminatas</a>
        </nav>
      </header>

      <main>
        <section id="inicio" class="content">
          <h1>Caminatas y actividades en la naturaleza</h1>
          <p>Esta aplicaci\u00f3n muestra caminatas y senderos en distintas regiones de Argentina.</p>
        </section>

        <section id="caminatas" class="content">
          <h2>Caminatas destacadas</h2>
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

export function renderTrailCards(trails) {
  const grid = document.getElementById("trailsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  trails.forEach(function (trail) {
    const card = createTrailCard(trail);
    grid.appendChild(card);
  });
}
