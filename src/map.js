import "./styles.css";
import { updateCartBadge } from "./cart/cartBadge.js";
import { renderHeader, updateHeaderUserState } from "./ui/header.js";

function setupFadeInAnimations() {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  const observeTargets = function () {
    document.querySelectorAll(".fade-in:not(.visible)").forEach(function (el) {
      observer.observe(el);
    });
  };

  observeTargets();
  return observeTargets;
}

function renderMapPage() {
  const app = document.querySelector("#app");
  if (!app) return;

  app.innerHTML = `
    <div class="page page--map">
      ${renderHeader("map")}
      <main>
        <section class="content content--light fade-in">
          <h1>Mapa de experiencias</h1>
          <p class="map-page__intro">
            Explora las caminatas y actividades de Naturaleza Argentina en un mapa interactivo.
          </p>
          <div class="map-page__canvas-placeholder" aria-label="Mapa interactivo proximamente">
            Aqui va el mapa (Bloque C/D)
          </div>
        </section>
      </main>

      <footer class="footer">
        <span>Naturaleza Argentina - Proyecto personal de Ivan Aquizu</span>
        <div class="footer__links">
          <span>(c) 2025 - Inspirado en la naturaleza de Argentina</span>
        </div>
      </footer>
    </div>
  `;
}

function initMapPage() {
  renderMapPage();
  updateHeaderUserState();
  updateCartBadge();
  const observeFadeIn = setupFadeInAnimations();
  observeFadeIn();
}

initMapPage();

export { initMapPage };
