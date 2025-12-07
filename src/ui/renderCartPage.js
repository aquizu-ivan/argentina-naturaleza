import { getProfile } from "../profile/profileStorage.js";
import { isStorageInFallbackMode } from "../utils/storageUtils.js";
import { renderHeader } from "./header.js";

export function renderCartPage() {
  const app = document.querySelector("#app");
  if (!app) return;

  const user = getProfile();
  const isFallback = isStorageInFallbackMode();

  app.innerHTML = `
    <div class="page">
      ${renderHeader("cart")}
      <main>
        <section class="content fade-in">
          <h1>Carrito de actividades y caminatas</h1>
          <p>Revisá lo que añadiste y ajustá cantidades antes de seguir explorando.</p>
          <div class="cart-toolbar">
            <div class="cart-toolbar__links">
              <a class="button button--ghost" href="/caminatas.html">Seguir explorando caminatas</a>
              <a class="button button--ghost" href="/activities.html">Seguir explorando actividades</a>
            </div>
            <button class="button button--secondary" type="button" id="clearCartButton">Vaciar carrito</button>
          </div>

          <div class="cart-layout">
            <h2 class="sr-only">Experiencias en tu carrito</h2>
            <div id="cartList" class="cart-list"></div>
            <aside class="cart-summary" aria-label="Resumen del carrito">
              <h2 class="sr-only">Resumen del carrito</h2>
              <div class="cart-summary__user">
                <p class="cart-summary__label">Datos del viajero</p>
                ${
                  user
                    ? `
                      <p class="cart-summary__value">${user.fullName || "Nombre no indicado"}</p>
                      <p class="cart-summary__detail">${user.email || "Email no indicado"}</p>
                      <p class="cart-summary__detail">${user.location || "Ciudad/Provincia no indicada"}</p>
                      <p class="cart-summary__note">Revisá que tus datos estén correctos antes de confirmar.</p>
                    `
                    : `
                      <p class="cart-summary__detail">Aún no cargaste tus datos.</p>
                      <a class="button button--ghost button--small" href="/perfil.html">Completar mis datos</a>
                    `
                }
              </div>
              <div>
                <p class="cart-summary__label">Total de ítems</p>
                <p class="cart-summary__value" id="cartCountText">0</p>
              </div>
              <div>
                <p class="cart-summary__label">Total a pagar</p>
                <p class="cart-summary__value" id="cartTotalText">$0</p>
              </div>
              <p class="cart-summary__note">Valores de referencia para imaginar tu recorrido, sin compra real.</p>
              ${
                isFallback
                  ? `<p class="cart-summary__note">Tu selección se mantiene mientras tengas esta página abierta.</p>`
                  : ""
              }
            </aside>
          </div>
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
}
