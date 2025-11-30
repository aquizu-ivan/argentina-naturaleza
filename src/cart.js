import "./styles.css";
import { clearCart, getCartCount, getCartItems, getCartTotal, removeFromCart, updateQuantity } from "./cart/cartStorage.js";
import { updateCartBadge } from "./cart/cartBadge.js";
import { formatPrice } from "./utils/formatters.js";
import { updateHeaderUserState } from "./ui/header.js";
import { renderCartPage } from "./ui/renderCartPage.js";

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

function createCartRow(item) {
  const row = document.createElement("article");
  row.className = "cart-item";

  const header = document.createElement("div");
  header.className = "cart-item__header";

  const title = document.createElement("h3");
  title.className = "cart-item__title";
  title.textContent = item.name;

  const type = document.createElement("span");
  type.className = "cart-item__type";
  type.textContent = item.type === "trail" ? "Caminata" : "Actividad";

  header.append(title, type);

  const meta = document.createElement("div");
  meta.className = "cart-item__meta";
  meta.innerHTML = `
    <span>📍 ${item.province || item.location || item.region || "Argentina"}</span>
    <span>⛰️ ${item.difficulty || "—"}</span>
    <span>⏱️ ${item.duration || "—"}</span>
  `;

  const price = document.createElement("div");
  price.className = "cart-item__price";
  price.textContent = formatPrice(item.price);

  const quantity = document.createElement("div");
  quantity.className = "cart-item__quantity";

  const minus = document.createElement("button");
  minus.type = "button";
  minus.className = "qty-btn";
  minus.setAttribute("aria-label", `Restar una unidad de ${item.name}`);
  minus.textContent = "−";

  const input = document.createElement("input");
  input.type = "number";
  input.min = "0";
  input.value = item.quantity || 1;
  input.setAttribute("aria-label", `Cantidad de ${item.name}`);

  const plus = document.createElement("button");
  plus.type = "button";
  plus.className = "qty-btn";
  plus.setAttribute("aria-label", `Sumar una unidad de ${item.name}`);
  plus.textContent = "+";

  const handleQuantityChange = function (value) {
    const next = Math.max(0, Number.parseInt(value, 10) || 0);
    updateQuantity(item.id, item.type, next);
    renderCartItems();
  };

  minus.addEventListener("click", function () {
    handleQuantityChange((item.quantity || 1) - 1);
  });

  plus.addEventListener("click", function () {
    handleQuantityChange((item.quantity || 1) + 1);
  });

  input.addEventListener("change", function (event) {
    handleQuantityChange(event.target.value);
  });

  quantity.append(minus, input, plus);

  const subtotal = document.createElement("div");
  subtotal.className = "cart-item__subtotal";
  subtotal.textContent = formatPrice((Number(item.price) || 0) * (item.quantity || 0));

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "button button--ghost button--small";
  removeButton.textContent = "Eliminar";
  removeButton.addEventListener("click", function () {
    removeFromCart(item.id, item.type);
    renderCartItems();
  });

  const rowFooter = document.createElement("div");
  rowFooter.className = "cart-item__footer";
  rowFooter.append(quantity, subtotal, removeButton);

  row.append(header, meta, price, rowFooter);
  return row;
}

function renderCartItems() {
  const list = document.getElementById("cartList");
  const countEl = document.getElementById("cartCountText");
  const totalEl = document.getElementById("cartTotalText");
  if (!list || !countEl || !totalEl) return;

  const items = getCartItems();
  list.innerHTML = "";

  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "Tu carrito está vacío. Sumá caminatas o actividades para empezar.";
    list.appendChild(empty);
  } else {
    items.forEach(function (item) {
      list.appendChild(createCartRow(item));
    });
  }

  const count = getCartCount();
  countEl.textContent = `${count} ${count === 1 ? "ítem" : "ítems"}`;
  totalEl.textContent = formatPrice(getCartTotal());
  updateCartBadge();
}

function bindToolbar() {
  const clearButton = document.getElementById("clearCartButton");
  if (clearButton) {
    clearButton.addEventListener("click", function () {
      clearCart();
      renderCartItems();
    });
  }
}

renderCartPage();
const observeFadeIn = setupFadeInAnimations();
renderCartItems();
bindToolbar();
observeFadeIn();
updateHeaderUserState();
