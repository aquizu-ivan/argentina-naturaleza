import { getProfile } from "../profile/profileStorage.js";

export function renderProfilePage() {
  const profile = getProfile();
  const hasProfile = Boolean(profile && profile.fullName);
  const greeting = hasProfile ? `Hola, ${profile.fullName}` : "Completá tu perfil para empezar";

  return `
    <main class="page page--profile fade-in">
      <section class="profile-card content">
        <h1>Mi perfil</h1>
        <p class="profile__helper">Guardá tus datos para agilizar tus próximas reservas de caminatas y actividades.</p>
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
            <button class="button button--primary" type="submit">Iniciar sesion</button>
            <a class="button button--ghost" href="/index.html">Volver a explorar</a>
            ${hasProfile ? `<button class="button button--ghost" type="button" data-profile-clear>Cerrar sesión</button>` : ""}
          </div>
          <div class="profile__note">Este flujo es demo: no hay backend ni autenticación real.</div>
          <div class="profile__status" id="profileStatus" role="status" aria-live="polite"></div>
        </form>
      </section>
    </main>
  `;
}
