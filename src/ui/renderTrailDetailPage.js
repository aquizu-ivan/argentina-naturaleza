import { addToCart } from "../cart/cartStorage.js";
import { updateCartBadge } from "../cart/cartBadge.js";
import { trailsData } from "../data/trailsData.js";
import { formatPrice } from "../utils/formatters.js";
import { renderHeader } from "./header.js";
import { announceCartAddition } from "../utils/ariaLive.js";

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

export function renderTrailDetailPage(trailId) {
  const app = document.querySelector("#app");
  if (!app) return;

  const trail = trailsData.find(function (item) {
    return item.id === trailId;
  });

  if (!trail) {
    upsertMeta(
      "Caminata no encontrada | Naturaleza Argentina",
      "No encontramos la caminata que buscás. Volvé a la lista para seguir explorando.",
      "/assets/og/og-hero.png"
    );

    app.innerHTML = `
      <div class="page">
        ${renderHeader("trails")}
        <main>
          <section class="content fade-in">
            <h1>Caminata no encontrada</h1>
            <p>No encontramos esta caminata. Volvé a la lista para seguir explorando.</p>
            <a class="button button--ghost" href="/caminatas.html">Volver a caminatas</a>
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
    updateCartBadge();
    const heading = app.querySelector("h1");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus();
    }
    return;
  }

  upsertMeta(
    `${trail.name} | Caminata en ${trail.region} | Naturaleza Argentina`,
    `${trail.name} en ${trail.region}. Dificultad ${trail.difficulty}, ${trail.duration}. Descubrí más detalles y beneficios.`,
    trail.imageUrl
  );

  app.innerHTML = `
    <div class="page">
      ${renderHeader("trails")}
      <main>
        <section class="content detail fade-in">
          <div class="detail__body" style="grid-column: 1 / -1;">
            <nav class="breadcrumbs" aria-label="Breadcrumb">
              <ol>
                <li><a href="/">Inicio</a></li>
                <li><a href="/caminatas.html">Caminatas</a></li>
                <li aria-current="page">${trail.name}</li>
              </ol>
            </nav>
          </div>
          <div class="detail__media">
            <img src="${trail.imageUrl}" alt="${trail.name} en ${trail.region}, imagen destacada de la caminata" loading="lazy" decoding="async" width="1200" height="720" />
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
            <h2>Información clave</h2>
            <div class="info-keys">
              <div class="info-keys__item"><span class="info-keys__icon" aria-hidden="true">⚡</span><span>Dificultad: ${trail.difficulty}</span></div>
              <div class="info-keys__item"><span class="info-keys__icon" aria-hidden="true">⏱️</span><span>Duración: ${trail.duration}</span></div>
              <div class="info-keys__item"><span class="info-keys__icon" aria-hidden="true">📍</span><span>Ubicación: ${trail.province} - ${trail.region}</span></div>
            </div>
            <div class="price-line">
              <span>Precio por persona</span>
              <strong>${formatPrice(trail.price)}</strong>
            </div>
            <div class="hero__actions">
              <button class="button button--primary" type="button" data-add-cart>Añadir al carrito</button>
              <a class="button button--ghost" href="/caminatas.html">Volver a caminatas</a>
            </div>
          </div>
        </section>

        <section class="content detail__section fade-in">
          <h2>Qué vas a vivir</h2>
          <ul class="benefits">
            ${trail.benefits
              .map(function (benefit) {
                return `<li><span class="benefits__icon" aria-hidden="true">🌿</span><span>${benefit}</span></li>`;
              })
              .join("")}
          </ul>
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

  const heading = app.querySelector("h1");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus();
  }

  const addButton = document.querySelector("[data-add-cart]");
  if (addButton) {
    addButton.addEventListener("click", function () {
      addToCart({
        id: trail.id,
        type: trail.type,
        name: trail.name,
        price: trail.price,
        province: trail.province,
        region: trail.region,
        difficulty: trail.difficulty,
        duration: trail.duration
      });
      updateCartBadge();
      announceCartAddition(`Se añadió ${trail.name} al carrito.`);
      addButton.textContent = "Añadido ✓";
      addButton.classList.add("button--added");
      window.setTimeout(function () {
        addButton.textContent = "Añadir al carrito";
        addButton.classList.remove("button--added");
      }, 1600);
    });
  }

  updateCartBadge();
}
