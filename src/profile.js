import "./styles.css";
import { renderHeader, updateHeaderUserState } from "./ui/header.js";
import { renderProfilePage } from "./ui/renderProfilePage.js";
import { clearProfile, getProfile, saveProfile } from "./profile/profileStorage.js";
import { showFeedbackMessage } from "./ui/feedbackMessages.js";

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

  document.querySelectorAll(".fade-in:not(.visible)").forEach(function (el) {
    observer.observe(el);
  });
}

function setupProfileForm() {
  const form = document.getElementById("profileForm");
  if (!form) return;

  const status = document.getElementById("profileStatus");
  const summary = document.getElementById("profileSummary");
  const profile = getProfile();

  const setError = function (field, message) {
    const errorEl = document.querySelector(`[data-error-for="${field}"]`);
    if (errorEl) errorEl.textContent = message || "";
  };

  if (profile) {
    form.fullName.value = profile.fullName || "";
    form.email.value = profile.email || "";
    form.location.value = profile.location || "";
    form.phone.value = profile.phone || "";
    form.notes.value = profile.notes || "";
  }

  const clearButton = document.querySelector("[data-profile-clear]");
  if (clearButton) {
    clearButton.addEventListener("click", function () {
      clearProfile();
      window.location.href = "/index.html";
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    setError("fullName", "");
    setError("email", "");
    if (status) {
      status.textContent = "";
      status.className = "profile__status";
    }

    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const location = form.location.value.trim();
    const phone = form.phone.value.trim();
    const notes = form.notes.value.trim();

    let hasError = false;
    if (!fullName) {
      setError("fullName", "Ingresá tu nombre completo.");
      hasError = true;
    }
    if (!email || !email.includes("@")) {
      setError("email", "Ingresá un email válido.");
      hasError = true;
    }
    if (hasError) {
      showFeedbackMessage({
        type: "warning",
        text: "Revisá los campos marcados antes de continuar."
      });
      return;
    }

    saveProfile({ fullName, email, location, phone, notes });
    if (status) {
      status.textContent = "Datos guardados para tus próximas reservas.";
      status.classList.add("profile__status--success");
    }
    showFeedbackMessage({
      type: "success",
      text: "Perfil guardado correctamente."
    });
    if (summary) {
      summary.textContent = fullName ? `Hola, ${fullName}` : "Perfil actualizado";
    }
    updateHeaderUserState();
  });
}

const app = document.querySelector("#app");
if (app) {
  app.innerHTML = `
    <div class="page page--profile">
      ${renderHeader("profile")}
      ${renderProfilePage()}
      <footer class="footer">
        <span>Naturaleza Argentina – Proyecto personal de Iván Aquizu</span>
        <div class="footer__links">
          <span>© 2025 – Inspirado en la naturaleza de Argentina</span>
        </div>
      </footer>
    </div>
  `;

  setupProfileForm();
  updateHeaderUserState();
  setupFadeInAnimations();
}
