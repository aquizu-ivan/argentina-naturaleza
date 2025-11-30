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
            <span class="hero__eyebrow">Explor\u00e1 la naturaleza argentina</span>
            <h1 class="hero__title">Caminatas y actividades al aire libre</h1>
            <p class="hero__subtitle">
              Bosques patag\u00f3nicos, yungas h\u00famedas, lagunas turquesa y cielos abiertos.
              Planific\u00e1 tu pr\u00f3xima salida y dejate llevar por los paisajes.
            </p>
            <div class="hero__chips">
              <span class="chip">🌲 Bosques</span>
              <span class="chip">🏔️ Monta\u00f1as</span>
              <span class="chip">💧 Lagunas</span>
            </div>
            <div class="hero__actions">
              <a class="button button--primary" href="/caminatas.html">Ver caminatas</a>
              <a class="button button--primary" href="/activities.html">Ver actividades</a>
            </div>
          </div>
        </section>

        <section id="inspiracion" class="content content--light fade-in">
          <h2>Respir\u00e1 aire libre</h2>
          <p>
            Inspirate con la diversidad de ecosistemas: estepa, selva, sierras y glaciares.
            Prepar\u00e1 tu equipo, eleg\u00ed el sendero y sal\u00ed a descubrir el pa\u00eds caminando.
          </p>
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
