import { getProfile } from "../profile/profileStorage.js";

function buildUserSlot(isActive = false) {
  const user = getProfile();
  const activeClass = isActive ? " nav__link--active" : "";
  const ariaCurrent = isActive ? ' aria-current="page"' : "";

  if (user && user.fullName) {
    const firstName = user.fullName.trim().split(" ")[0];
    return `<a class="nav__link nav__link--profile${activeClass}" href="perfil.html" aria-label="Ir a mi perfil"${ariaCurrent}>Hola, ${firstName}</a>`;
  }
  return `<a class="nav__link nav__link--profile${activeClass}" href="perfil.html"${ariaCurrent}>Mi perfil</a>`;
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
  const isMap = activePage === "map";
  const isCart = activePage === "cart";
  const isProfile = activePage === "profile";

  return `
    <header class="topbar fade-in">
      <div class="brand">
        <span class="brand__dot"></span>
        <span class="brand__text">Naturaleza Argentina</span>
      </div>
      <nav class="nav" aria-label="Navegaci\u00f3n principal">
        <a class="nav__link ${isHome ? "nav__link--active" : ""}" href="index.html" ${isHome ? 'aria-current="page"' : ""}>Inicio</a>
        <a class="nav__link ${isTrails ? "nav__link--active" : ""}" href="caminatas.html" ${isTrails ? 'aria-current="page"' : ""}>Caminatas</a>
        <a class="nav__link ${isActivities ? "nav__link--active" : ""}" href="activities.html" ${isActivities ? 'aria-current="page"' : ""}>Actividades</a>
        <a class="nav__link ${isMap ? "nav__link--active" : ""}" href="mapa.html" ${isMap ? 'aria-current="page"' : ""}>Mapa</a>
        <a class="nav__link nav__link--cart ${isCart ? "nav__link--active" : ""}" href="carrito.html" data-cart-link ${isCart ? 'aria-current="page"' : ""}>
          <span class="nav__icon" aria-hidden="true">&#128722;</span>
          <span>Carrito</span>
          <span class="cart-badge" data-cart-badge></span>
        </a>
      </nav>
      <div class="nav nav--right" data-user-slot>
        ${buildUserSlot(isProfile)}
      </div>
    </header>
  `;
}
