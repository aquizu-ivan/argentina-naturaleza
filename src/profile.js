import "./styles.css";
import { renderHeader, updateHeaderUserState } from "./ui/header.js";
import { renderProfilePage } from "./ui/renderProfilePage.js";
import { clearProfile, getProfile, saveProfile } from "./profile/profileStorage.js";
import { showFeedbackMessage } from "./ui/feedbackMessages.js";

function setupFadeInAnimations() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const markVisible = function () {
    document.querySelectorAll(".fade-in:not(.visible)").forEach(function (el) {
      el.classList.add("visible");
    });
  };
  if (prefersReducedMotion) {
    markVisible();
    return;
  }
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

  const fullNameInput = form.querySelector("#fullName");
  const emailInput = form.querySelector("#email");
  const locationInput = form.querySelector("#location");
  const phoneInput = form.querySelector("#phone");
  const notesInput = form.querySelector("#notes");

  const fullNameError = document.getElementById("fullNameError");
  const emailError = document.getElementById("emailError");
  const errorsSummary = document.getElementById("profileErrorsSummary");

  function setFieldError(input, errorElement, message) {
    if (!input || !errorElement) return;
    input.setAttribute("aria-invalid", "true");
    const current = input.getAttribute("aria-describedby");
    const ids = current ? current.split(" ").filter(Boolean) : [];
    if (!ids.includes(errorElement.id)) {
      ids.push(errorElement.id);
    }
    input.setAttribute("aria-describedby", ids.join(" "));
    errorElement.textContent = message;
  }

  function clearFieldError(input, errorElement) {
    if (!input || !errorElement) return;
    input.removeAttribute("aria-invalid");
    const current = input.getAttribute("aria-describedby");
    if (current) {
      const ids = current
        .split(" ")
        .filter(Boolean)
        .filter(function (id) {
          return id !== errorElement.id;
        });
      if (ids.length > 0) {
        input.setAttribute("aria-describedby", ids.join(" "));
      } else {
        input.removeAttribute("aria-describedby");
      }
    }
    errorElement.textContent = "";
  }

  if (profile) {
    if (fullNameInput) fullNameInput.value = profile.fullName || "";
    if (emailInput) emailInput.value = profile.email || "";
    if (locationInput) locationInput.value = profile.location || "";
    if (phoneInput) phoneInput.value = profile.phone || "";
    if (notesInput) notesInput.value = profile.notes || "";
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
    clearFieldError(fullNameInput, fullNameError);
    clearFieldError(emailInput, emailError);
    if (errorsSummary) {
      errorsSummary.textContent = "";
    }
    if (status) {
      status.textContent = "";
      status.className = "profile__status";
    }

    const fullName = fullNameInput ? fullNameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const location = locationInput ? locationInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const notes = notesInput ? notesInput.value.trim() : "";

    let hasError = false;
    if (fullNameInput && !fullName) {
      setFieldError(fullNameInput, fullNameError, "Ingresá tu nombre completo.");
      hasError = true;
    }
    if (!email || !email.includes("@")) {
      setFieldError(
        emailInput,
        emailError,
        "Ingresá un correo válido, por ejemplo: nombre@correo.com."
      );
      hasError = true;
    }
    if (hasError) {
      if (errorsSummary) {
        const messages = [];
        if (fullNameInput && fullNameInput.hasAttribute("aria-invalid")) {
          messages.push("Nombre completo");
        }
        if (emailInput && emailInput.hasAttribute("aria-invalid")) {
          messages.push("Email");
        }
        const count = messages.length;
        errorsSummary.textContent =
          count > 0
            ? `Hay ${count} campo${count > 1 ? "s" : ""} con error: ${messages.join(", ")}.`
            : "";
      }
      showFeedbackMessage({
        type: "warning",
        text: "Revisá los campos marcados antes de continuar."
      });
      const firstErrorInput = form.querySelector("[aria-invalid='true']");
      if (firstErrorInput) {
        firstErrorInput.focus();
      }
      return;
    }

    saveProfile({ fullName, email, location, phone, notes });
    if (status) {
      status.textContent = "Datos guardados para tus próximas salidas.";
      status.classList.add("profile__status--success");
      status.focus();
    }
    if (errorsSummary) {
      errorsSummary.textContent = "";
    }
    showFeedbackMessage({
      type: "success",
      text: "Datos guardados para tus próximas salidas."
    });
    if (summary) {
      summary.textContent = fullName ? `Hola, ${fullName}` : "Perfil actualizado en este dispositivo";
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
        <span>Naturaleza Argentina - Obra creada por IAQUIZU — Origin Architect of the Eighth Art</span>
        <div class="footer__links">
          <span>&copy; 2025 - Inspirado en la naturaleza de Argentina</span>
        </div>
      </footer>
    </div>
  `;

  setupProfileForm();
  updateHeaderUserState();
  setupFadeInAnimations();

  const heading = app.querySelector(".page--profile h1");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus();
  }
}
