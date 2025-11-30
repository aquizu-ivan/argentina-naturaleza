import { activitiesData } from "../data/activitiesData.js";

export function renderActivityDetailPage(activityId) {
  const app = document.querySelector("#app");
  if (!app) return;

  const activity = activitiesData.find(function (item) {
    return item.id === activityId;
  });

  if (!activity) {
    app.innerHTML = `
      <div class="page">
        <header class="topbar fade-in">
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
          <section class="content fade-in">
            <h1>Actividad no encontrada</h1>
            <p>La actividad que buscás no existe. Volvé a la lista para seguir explorando.</p>
            <a class="button button--ghost" href="/activities.html">Volver a actividades</a>
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
          <a class="nav__link" href="/caminatas.html">Caminatas</a>
          <a class="nav__link nav__link--active" href="/activities.html">Actividades</a>
        </nav>
      </header>

      <main>
        <section class="content detail fade-in">
          <div class="detail__media">
            <img src="${activity.imageUrl}" alt="${activity.name}" loading="lazy" />
          </div>
          <div class="detail__body">
            <div class="detail__meta">
              <span class="pill">Actividad</span>
              <span class="pill">${activity.style}</span>
              <span class="pill">Duración: ${activity.duration}</span>
            </div>
            <h1>${activity.name}</h1>
            <p>${activity.description}</p>
            <p>${activity.longDescription}</p>
            <p class="pill" aria-label="Ubicación">${activity.location}</p>
            <div class="hero__actions">
              <a class="button button--primary" href="/activities.html">Volver a actividades</a>
            </div>
          </div>
        </section>

        <section class="content detail__section fade-in">
          <h2>Beneficios</h2>
          <ul class="benefits">
            ${activity.benefits.map(function (benefit) {
              return `<li>${benefit}</li>`;
            }).join("")}
          </ul>
        </section>
      </main>
    </div>
  `;
}
