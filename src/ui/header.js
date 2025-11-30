import { getProfile } from "../profile/profileStorage.js";

function buildUserSlot() {
  const user = getProfile();
  if (user && user.fullName) {
    const firstName = user.fullName.trim().split(" ")[0];
    return `<a class="nav__link nav__link--profile" href="/perfil.html" aria-label="Ir a mi perfil">Hola, ${firstName}</a>`;
  }
  return `<a class="nav__link nav__link--profile" href="/perfil.html">Mi perfil</a>`;
}

export function updateHeaderUserState(root = document) {
  const slot = root.querySelector("[data-user-slot]");
  if (!slot) return;
  slot.innerHTML = buildUserSlot();
}

export function renderHeader(activePage) {
  const isHome = activePage === "home";
  const isTrails = activePage === "trails";
  const isActivities = activePage === "activities";
  const isCart = activePage === "cart";
  const isProfile = activePage === "profile";

  return `
    <header class="topbar fade-in">
      <div class="brand">
        <span class="brand__dot"></span>
        <span class="brand__text">Naturaleza Argentina</span>
      </div>
      <nav class="nav">
        <a class="nav__link ${isHome ? "nav__link--active" : ""}" href="/">Inicio</a>
        <a class="nav__link ${isTrails ? "nav__link--active" : ""}" href="/caminatas.html">Caminatas</a>
        <a class="nav__link ${isActivities ? "nav__link--active" : ""}" href="/activities.html">Actividades</a>
        <a class="nav__link nav__link--cart ${isCart ? "nav__link--active" : ""}" href="/carrito.html" data-cart-link>
          <span class="nav__icon" aria-hidden="true">🛒</span>
          <span>Carrito</span>
          <span class="cart-badge" data-cart-badge></span>
        </a>
      </nav>
      <div class="nav nav--right" data-user-slot>
        ${buildUserSlot().replace(
          "nav__link--profile",
          `nav__link nav__link--profile ${isProfile ? "nav__link--active" : ""}`
        )}
      </div>
    </header>
  `;
}
