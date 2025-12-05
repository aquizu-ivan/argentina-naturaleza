import { addToCart } from "../cart/cartStorage.js";
import { updateCartBadge } from "../cart/cartBadge.js";
import { formatPrice } from "../utils/formatters.js";

export function createActivityCard(activity) {
  const card = document.createElement("article");
  card.className = "trail-card fade-in";

  const link = document.createElement("a");
  link.className = "card-link";
  link.href = `/actividad-detalle.html?id=${encodeURIComponent(activity.id)}`;
  link.setAttribute("aria-label", `${activity.name}, ${activity.style}`);

  const image = document.createElement("img");
  image.src = activity.imageUrl;
  image.alt = activity.name;
  image.loading = "lazy";
  image.decoding = "async";
  image.width = 400;
  image.height = 260;
  image.className = "card__image";

  const title = document.createElement("h3");
  title.textContent = activity.name;

  const location = document.createElement("p");
  location.textContent = activity.location;

  const details = document.createElement("p");
  details.textContent = `${activity.style} · Duración: ${activity.duration}`;

  const description = document.createElement("p");
  description.textContent = activity.description;

  const meta = document.createElement("div");
  meta.className = "card-meta";
  meta.innerHTML = `
    <span class="card-meta__item"><span class="card-meta__icon" aria-hidden="true">⛰️</span><span>Dificultad: ${activity.difficulty}</span></span>
    <span class="card-meta__item"><span class="card-meta__icon" aria-hidden="true">⏱️</span><span>${activity.duration}</span></span>
    <span class="card-meta__item"><span class="card-meta__icon" aria-hidden="true">🗺️</span><span>${activity.region}</span></span>
  `;

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const price = document.createElement("span");
  price.className = "card-price";
  price.textContent = formatPrice(activity.price);

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "button button--cart";
  addButton.textContent = "Añadir al carrito";
  addButton.addEventListener("click", function (event) {
    event.stopPropagation();
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
    addButton.classList.add("button--added");
    addButton.textContent = "Añadido ✔";
    window.setTimeout(function () {
      addButton.classList.remove("button--added");
      addButton.textContent = "Añadir al carrito";
    }, 1400);
  });

  link.append(image, title, location, details, description, meta);
  actions.append(price, addButton);
  card.append(link, actions);

  return card;
}
