import { addToCart } from "../cart/cartStorage.js";
import { updateCartBadge } from "../cart/cartBadge.js";
import { formatPrice } from "../utils/formatters.js";
import { createWeatherChip } from "./createWeatherChip.js";
import { announceCartAddition } from "../utils/ariaLive.js";

function resolveImagePath(path) {
  const base = import.meta.env.BASE_URL || "/";
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return new URL(normalized, window.location.origin + base).href;
}

export function createTrailCard(trail) {
  const card = document.createElement("article");
  card.className = "trail-card fade-in";

  const link = document.createElement("a");
  link.className = "card-link";
  link.href = `caminata-detalle.html?id=${encodeURIComponent(trail.id)}`;
  link.setAttribute("aria-label", `${trail.name}, dificultad ${trail.difficulty}`);

  const image = document.createElement("img");
  image.src = resolveImagePath(trail.imageUrl);
  image.alt = trail.name;
  image.loading = "lazy";
  image.decoding = "async";
  image.width = 400;
  image.height = 260;
  image.className = "card__image";

  const title = document.createElement("h3");
  title.textContent = trail.name;

  const location = document.createElement("p");
  location.textContent = `${trail.province} - ${trail.region}`;

  const details = document.createElement("p");
  details.textContent = `Dificultad: ${trail.difficulty} \u00b7 Duración: ${trail.duration}`;

  const description = document.createElement("p");
  description.textContent = trail.description;

  const meta = document.createElement("div");
  meta.className = "card-meta";
  meta.innerHTML = `
    <span class="card-meta__item"><span class="card-meta__icon" aria-hidden="true">\u26a1</span><span>Dificultad: ${trail.difficulty}</span></span>
    <span class="card-meta__item"><span class="card-meta__icon" aria-hidden="true">\u23f1\ufe0f</span><span>Duración: ${trail.duration}</span></span>
    <span class="card-meta__item"><span class="card-meta__icon" aria-hidden="true">\ud83d\uddcd</span><span>Región: ${trail.region}</span></span>
  `;

  const weatherChip = createWeatherChip(trail.city);

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const price = document.createElement("span");
  price.className = "card-price";
  price.textContent = formatPrice(trail.price);

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "button button--cart";
  addButton.textContent = "Añadir al carrito";
  addButton.addEventListener("click", function (event) {
    event.stopPropagation();
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
    addButton.classList.add("button--added");
    addButton.textContent = "Añadido ✓";
    window.setTimeout(function () {
      addButton.classList.remove("button--added");
      addButton.textContent = "Añadir al carrito";
    }, 1400);
  });

  if (weatherChip) {
    link.append(image, title, location, details, description, meta, weatherChip);
  } else {
    link.append(image, title, location, details, description, meta);
  }
  actions.append(price, addButton);
  card.append(link, actions);

  return card;
}
