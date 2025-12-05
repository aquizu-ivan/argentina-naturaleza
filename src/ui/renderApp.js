import { renderHeader } from "./header.js";

export function renderApp() {
  const app = document.querySelector("#app");
  if (!app) return;

  app.innerHTML = `
    <div class="page">
      ${renderHeader("home")}
      <main>
        <section id="inicio" class="hero fade-in">
          <div class="hero__image-layer"></div>
          <div class="hero__content">
            <span class="hero__eyebrow">Explorá la naturaleza argentina</span>
            <h1 class="hero__title">Caminatas y actividades al aire libre</h1>
            <p class="hero__subtitle">
              Bosques patagónicos, yungas húmedas, lagunas turquesa y cielos abiertos.
              Planificá tu próxima salida y dejate llevar por los paisajes.
            </p>
            <div class="hero__chips">
              <span class="chip">🌲 Bosques</span>
              <span class="chip">⛰️ Montañas</span>
              <span class="chip">🏞️ Lagunas</span>
            </div>
            <div class="hero__actions">
              <a class="button button--primary" href="/caminatas.html">Ver caminatas</a>
              <a class="button button--primary" href="/activities.html">Ver actividades</a>
            </div>
          </div>
        </section>

        <section id="inspiracion" class="content content--light fade-in">
          <h2>Respirá aire libre</h2>
          <p>
            Inspirate con la diversidad de ecosistemas: estepa, selva, sierras y glaciares.
            Prepará tu equipo, elegí el sendero y salí a descubrir el país caminando.
          </p>
        </section>
      </main>

      <footer class="footer">
        <span>Naturaleza Argentina – Proyecto personal de Iván Aquizu</span>
        <div class="footer__links">
          <span>© 2025 – Inspirado en la naturaleza de Argentina</span>
        </div>
      </footer>
    </div>
  `;
}
