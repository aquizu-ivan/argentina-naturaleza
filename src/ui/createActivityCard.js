import { addToCart } from "../cart/cartStorage.js";
import { updateCartBadge } from "../cart/cartBadge.js";
import { formatPrice } from "../utils/formatters.js";
import { announceCartAddition } from "../utils/ariaLive.js";

function resolveImagePath(path) {
  const base = import.meta.env.BASE_URL || "/";
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return new URL(normalized, window.location.origin + base).href;
}

export function createActivityCard(activity) {
  const card = document.createElement("article");
  card.className = "trail-card fade-in";

  const link = document.createElement("a");
  link.className = "card-link";
  link.href = `actividad-detalle.html?id=${encodeURIComponent(activity.id)}`;
  link.setAttribute("aria-label", `${activity.name}, ${activity.style}`);

  const image = document.createElement("img");
  image.src = resolveImagePath(activity.imageUrl);
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
  details.textContent = `${activity.style} \u00b7 Duraci\u00f3n: ${activity.duration}`;

  const description = document.createElement("p");
  description.textContent = activity.description;

  const meta = document.createElement("div");
  meta.className = "card-meta";
  meta.innerHTML = `
    <span class="card-meta__item"><span class="card-meta__icon" aria-hidden="true">\u26a1</span><span>Dificultad: ${activity.difficulty}</span></span>
    <span class="card-meta__item"><span class="card-meta__icon" aria-hidden="true">\u23f1\ufe0f</span><span>Duraci\u00f3n: ${activity.duration}</span></span>
    <span class="card-meta__item"><span class="card-meta__icon" aria-hidden="true">\ud83d\uddcd</span><span>Regi\u00f3n: ${activity.region}</span></span>
  `;

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const price = document.createElement("span");
  price.className = "card-price";
  price.textContent = formatPrice(activity.price);

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "button button--cart";
  addButton.textContent = "A\u00f1adir al carrito";
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
    announceCartAddition(`Se añadió ${activity.name} al carrito.`);
    addButton.classList.add("button--added");
    addButton.textContent = "A\u00f1adido \u2713";
    window.setTimeout(function () {
      addButton.classList.remove("button--added");
      addButton.textContent = "A\u00f1adir al carrito";
    }, 1400);
  });

  link.append(image, title, location, details, description, meta);
  actions.append(price, addButton);
  card.append(link, actions);

  return card;
}
