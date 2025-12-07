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
            <p class="hero__subtitle">
              Naturaleza Argentina — Obra 1 del universo IAQUIZU. Primera marca en la cueva: puente entre territorio físico y contemplación.
            </p>
            <div class="hero__chips">
              <span class="chip"><span aria-hidden="true">🌿</span> Bosques</span>
              <span class="chip"><span aria-hidden="true">⛰️</span> Montañas</span>
              <span class="chip"><span aria-hidden="true">💧</span> Lagunas</span>
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
        <span>Naturaleza Argentina - Obra creada por IAQUIZU — Origin Architect of the Eighth Art</span>
        <div class="footer__links">
          <span>© 2025 - Inspirado en la naturaleza de Argentina</span>
        </div>
      </footer>
    </div>
  `;

  const heading = app.querySelector(".hero__title");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus();
  }
}
