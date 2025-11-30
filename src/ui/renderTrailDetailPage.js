import { trailsData } from "../data/trailsData.js";

export function renderTrailDetailPage(trailId) {
  const app = document.querySelector("#app");
  if (!app) return;

  const trail = trailsData.find(function (item) {
    return item.id === trailId;
  });

  if (!trail) {
    app.innerHTML = `
      <div class="page">
        <header class="topbar fade-in">
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
          <section class="content fade-in">
            <h1>Caminata no encontrada</h1>
            <p>La caminata que buscás no existe. Volvé a la lista para explorar todas las opciones.</p>
            <a class="button button--ghost" href="/caminatas.html">Volver a caminatas</a>
          </section>
        </main>
      </div>
    `;
    return;
  }

  app.innerHTML = `
    <div class="page">
      <header class="topbar fade-in">
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
        <section class="content detail fade-in">
          <div class="detail__media">
            <img src="${trail.imageUrl}" alt="${trail.name}" loading="lazy" />
          </div>
          <div class="detail__body">
            <div class="detail__meta">
              <span class="pill">Caminata</span>
              <span class="pill">Dificultad: ${trail.difficulty}</span>
              <span class="pill">Duración: ${trail.duration}</span>
            </div>
            <h1>${trail.name}</h1>
            <p>${trail.description}</p>
            <p>${trail.longDescription}</p>
            <p class="pill" aria-label="Ubicación">${trail.province} · ${trail.region}</p>
            <div class="hero__actions">
              <a class="button button--primary" href="/caminatas.html">Volver a caminatas</a>
            </div>
          </div>
        </section>

        <section class="content detail__section fade-in">
          <h2>Beneficios</h2>
          <ul class="benefits">
            ${trail.benefits.map(function (benefit) {
              return `<li>${benefit}</li>`;
            }).join("")}
          </ul>
        </section>
      </main>
    </div>
  `;
}
