import "./styles.css";
import { updateCartBadge } from "./cart/cartBadge.js";
import { renderApp } from "./ui/renderApp.js";
import { updateHeaderUserState } from "./ui/header.js";

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

renderApp();
const observeFadeIn = setupFadeInAnimations();
observeFadeIn();
updateCartBadge();
updateHeaderUserState();
