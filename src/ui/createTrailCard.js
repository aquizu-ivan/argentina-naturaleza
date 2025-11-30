import { addToCart } from "../cart/cartStorage.js";
import { updateCartBadge } from "../cart/cartBadge.js";
import { formatPrice } from "../utils/formatters.js";

export function createTrailCard(trail) {
  const card = document.createElement("article");
  card.className = "trail-card fade-in";

  const link = document.createElement("a");
  link.className = "card-link";
  link.href = `/caminata-detalle.html?id=${encodeURIComponent(trail.id)}`;
  link.setAttribute("aria-label", `${trail.name}, dificultad ${trail.difficulty}`);

  const title = document.createElement("h3");
  title.textContent = trail.name;

  const location = document.createElement("p");
  location.textContent = `${trail.province} · ${trail.region}`;

  const details = document.createElement("p");
  details.textContent = `Dificultad: ${trail.difficulty} • Duración: ${trail.duration}`;

  const description = document.createElement("p");
  description.textContent = trail.description;

  const meta = document.createElement("div");
  meta.className = "card-meta";
  meta.innerHTML = `
    <span class="card-meta__item"><span class="card-meta__icon" aria-hidden="true">⛰️</span><span>Dificultad: ${trail.difficulty}</span></span>
    <span class="card-meta__item"><span class="card-meta__icon" aria-hidden="true">⏱️</span><span>${trail.duration}</span></span>
    <span class="card-meta__item"><span class="card-meta__icon" aria-hidden="true">📍</span><span>${trail.region}</span></span>
  `;

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
    addButton.classList.add("button--added");
    addButton.textContent = "Añadido ✓";
    window.setTimeout(function () {
      addButton.classList.remove("button--added");
      addButton.textContent = "Añadir al carrito";
    }, 1400);
  });

  link.append(title, location, details, description, meta);
  actions.append(price, addButton);
  card.append(link, actions);

  return card;
}
