import { getCartCount } from "./cartStorage.js";

export function updateCartBadge() {
  const count = getCartCount();
  const label = count > 0 ? `Carrito, ${count} elemento${count === 1 ? "" : "s"}` : "Carrito vacío";

  document.querySelectorAll("[data-cart-badge]").forEach(function (badge) {
    if (count > 0) {
      badge.textContent = String(count);
      badge.classList.add("cart-badge--visible");
      badge.setAttribute("aria-label", label);
    } else {
      badge.textContent = "";
      badge.classList.remove("cart-badge--visible");
      badge.removeAttribute("aria-label");
    }
  });

  document.querySelectorAll("[data-cart-link]").forEach(function (link) {
    link.setAttribute("aria-label", label);
  });

  return count;
}
