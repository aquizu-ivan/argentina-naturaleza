import { addToCart } from "../cart/cartStorage.js";
import { updateCartBadge } from "../cart/cartBadge.js";
import { activitiesData } from "../data/activitiesData.js";
import { formatPrice } from "../utils/formatters.js";
import { renderHeader } from "./header.js";

function upsertMeta(title, description, image) {
  if (title) {
    document.title = title;
  }
  if (description) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }
  const ensureOg = function (property, content) {
    if (!content) return;
    let og = document.querySelector(`meta[property="${property}"]`);
    if (!og) {
      og = document.createElement("meta");
      og.setAttribute("property", property);
      document.head.appendChild(og);
    }
    og.setAttribute("content", content);
  };
  ensureOg("og:title", title);
  ensureOg("og:description", description);
  ensureOg("og:image", image || "/assets/og/og-hero.png");
}

export function renderActivityDetailPage(activityId) {
  const app = document.querySelector("#app");
  if (!app) return;

  const activity = activitiesData.find(function (item) {
    return item.id === activityId;
  });

  if (!activity) {
    upsertMeta(
      "Actividad no encontrada | Naturaleza Argentina",
      "No encontramos la actividad que busc\u00e1s. Volv\u00e9 a la lista para seguir explorando.",
      "/assets/og/og-hero.png"
    );
    app.innerHTML = `
      <div class="page">
        ${renderHeader("activities")}
        <main>
          <section class="content fade-in">
            <h1>Actividad no encontrada</h1>
            <p>No encontramos esta actividad. Volv\u00e9 a la lista para seguir explorando.</p>
            <a class="button button--ghost" href="/activities.html">Volver a actividades</a>
          </section>
        </main>

        <footer class="footer">
          <span>Naturaleza Argentina - Proyecto personal de Ivan Aquizu</span>
          <div class="footer__links">
            <span>\u00a9 2025 - Inspirado en la naturaleza de Argentina</span>
          </div>
        </footer>
      </div>
    `;
    updateCartBadge();
    return;
  }

  upsertMeta(
    `${activity.name} | Actividad al aire libre | Naturaleza Argentina`,
    `${activity.name} en ${activity.region}. Duraci\u00f3n ${activity.duration}. Descubr\u00ed m\u00e1s detalles y beneficios.`,
    activity.imageUrl
  );

  app.innerHTML = `
    <div class="page">
      ${renderHeader("activities")}
      <main>
        <section class="content detail fade-in">
          <div class="detail__body" style="grid-column: 1 / -1;">
            <nav class="breadcrumbs" aria-label="Breadcrumb">
              <a href="/activities.html">Actividades</a>
              <span aria-hidden="true" class="breadcrumbs__separator">\u203a</span>
              <span>${activity.name}</span>
            </nav>
          </div>
          <div class="detail__media">
            <img src="${activity.imageUrl}" alt="${activity.name} en ${activity.region}, imagen destacada de la actividad" loading="lazy" decoding="async" width="1200" height="720" />
          </div>
          <div class="detail__body">
            <div class="detail__meta">
              <span class="pill">Actividad</span>
              <span class="pill">${activity.style}</span>
              <span class="pill">Duraci\u00f3n: ${activity.duration}</span>
            </div>
            <h1>${activity.name}</h1>
            <p>${activity.description}</p>
            <p>${activity.longDescription}</p>
            <h2>Informaci\u00f3n clave</h2>
            <div class="info-keys">
              <div class="info-keys__item"><span class="info-keys__icon" aria-hidden="true">\u26a1</span><span>Dificultad: ${activity.difficulty}</span></div>
              <div class="info-keys__item"><span class="info-keys__icon" aria-hidden="true">\u23f1\ufe0f</span><span>Duraci\u00f3n: ${activity.duration}</span></div>
              <div class="info-keys__item"><span class="info-keys__icon" aria-hidden="true">\ud83d\uddcd</span><span>Ubicaci\u00f3n: ${activity.region} - ${activity.location}</span></div>
            </div>
            <div class="price-line">
              <span>Precio por persona</span>
              <strong>${formatPrice(activity.price)}</strong>
            </div>
            <div class="hero__actions">
              <button class="button button--primary" type="button" data-add-cart aria-label="A\u00f1adir actividad al carrito">A\u00f1adir al carrito</button>
              <a class="button button--ghost" href="/activities.html">Volver a actividades</a>
            </div>
          </div>
        </section>

        <section class="content detail__section fade-in">
          <h2>Beneficios para tu cuerpo y mente</h2>
          <ul class="benefits">
            ${activity.benefits
              .map(function (benefit) {
                return `<li><span class="benefits__icon" aria-hidden="true">\ud83c\udf3f</span><span>${benefit}</span></li>`;
              })
              .join("")}
          </ul>
        </section>
      </main>

      <footer class="footer">
        <span>Naturaleza Argentina - Proyecto personal de Ivan Aquizu</span>
        <div class="footer__links">
          <span>\u00a9 2025 - Inspirado en la naturaleza de Argentina</span>
        </div>
      </footer>
    </div>
  `;

  const addButton = document.querySelector("[data-add-cart]");
  if (addButton) {
    addButton.addEventListener("click", function () {
      addToCart({
        id: activity.id,
        type: activity.type,
        name: activity.name,
        price: activity.price,
        region: activity.region,
        location: activity.location,
        difficulty: activity.difficulty,
        duration: activity.duration,
        style: activity.style
      });
      updateCartBadge();
      addButton.textContent = "A\u00f1adido \u2713";
      addButton.classList.add("button--added");
      window.setTimeout(function () {
        addButton.textContent = "A\u00f1adir al carrito";
        addButton.classList.remove("button--added");
      }, 1600);
    });
  }

  updateCartBadge();
}
