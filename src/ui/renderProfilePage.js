import { getProfile } from "../profile/profileStorage.js";
import { isStorageInFallbackMode } from "../utils/storageUtils.js";

export function renderProfilePage() {
  const profile = getProfile();
  const hasProfile = Boolean(profile && profile.fullName);
  const greeting = hasProfile
    ? `Hola, ${profile.fullName}`
    : "Completá tus datos en este dispositivo para empezar";
  const fallbackHint = isStorageInFallbackMode()
    ? " Tus datos se mantienen mientras tengas esta página abierta."
    : "";

  return `
    <main class="page page--profile fade-in">
      <section class="profile-card content">
        <h1>Tu perfil en este dispositivo</h1>
        <p class="profile__helper">Guardá tus datos de contacto en este navegador para completar más rápido tus próximas reservas. No se crea ninguna cuenta y podés borrar los datos cuando quieras.</p>
        <div class="profile__summary" id="profileSummary">${greeting}</div>
        <form id="profileForm" class="profile__form">
          <p id="profileErrorsSummary" class="sr-only" aria-live="assertive"></p>
          <div class="profile__fields">
            <div class="profile__field">
              <label for="fullName">Nombre completo</label>
              <input id="fullName" name="fullName" type="text" autocomplete="name" required />
              <small
                id="fullNameError"
                class="profile__error"
                data-error-for="fullName"
                aria-live="polite"
              ></small>
            </div>
            <div class="profile__field">
              <label for="email">Email</label>
              <input id="email" name="email" type="email" autocomplete="email" required />
              <small
                id="emailError"
                class="profile__error"
                data-error-for="email"
                aria-live="polite"
              ></small>
            </div>
            <div class="profile__field">
              <label for="location">Localidad / Provincia</label>
              <input id="location" name="location" type="text" autocomplete="address-level2" />
            </div>
            <div class="profile__field">
              <label for="phone">Teléfono</label>
              <input id="phone" name="phone" type="tel" autocomplete="tel" />
            </div>
            <div class="profile__field profile__field--full">
              <label for="notes">Nota / Preferencias</label>
              <textarea id="notes" name="notes" rows="3" placeholder="¿Algo que debamos saber? (opcional)"></textarea>
            </div>
          </div>
          <div class="profile__actions">
            <button class="button button--primary" type="submit">Guardar datos en este dispositivo</button>
            <a class="button button--ghost" href="index.html">Volver a explorar</a>
            ${hasProfile ? `<button class="button button--ghost" type="button" data-profile-clear aria-label="Borrar los datos guardados de este dispositivo">Borrar datos guardados</button>` : ""}
          </div>
          <div class="profile__note">Tus datos se guardan solo en este navegador. No se crea ninguna cuenta y podés borrarlos en cualquier momento.${fallbackHint}</div>
          <div class="profile__status${hasProfile ? " profile__status--success" : ""}" id="profileStatus" role="status" aria-live="polite" tabindex="-1">
            ${hasProfile ? "Datos guardados en este dispositivo." : "Todavía no guardaste datos en este dispositivo."}
          </div>
        </form>
      </section>
    </main>
  `;
}
