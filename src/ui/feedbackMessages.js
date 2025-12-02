const CONTAINER_CLASS = "feedback-container";
const MESSAGE_BASE_CLASS = "feedback-message";
const MESSAGE_TYPES = {
  success: "feedback-message--success",
  info: "feedback-message--info",
  warning: "feedback-message--warning"
};
const ENTER_CLASS = "feedback-message--enter";
const LEAVE_CLASS = "feedback-message--leave";
const DEFAULT_DURATION = 3600;
const LEAVE_DURATION = 250;

function getOrCreateContainer() {
  let container = document.querySelector(`.${CONTAINER_CLASS}`);
  if (container) return container;

  container = document.createElement("div");
  container.className = CONTAINER_CLASS;
  container.setAttribute("aria-live", "polite");
  document.body.appendChild(container);
  return container;
}

export function showFeedbackMessage({ type = "info", text = "" } = {}) {
  const container = getOrCreateContainer();
  const message = document.createElement("div");
  const typeClass = MESSAGE_TYPES[type] || MESSAGE_TYPES.info;

  message.className = `${MESSAGE_BASE_CLASS} ${typeClass}`;
  message.textContent = text;

  // Estado inicial para animación de entrada
  message.classList.add(ENTER_CLASS);
  container.appendChild(message);

  // Forzar reflow para permitir la transición
  requestAnimationFrame(() => {
    message.classList.remove(ENTER_CLASS);
  });

  const removeMessage = () => {
    message.classList.add(LEAVE_CLASS);
    window.setTimeout(() => {
      message.remove();
    }, LEAVE_DURATION);
  };

  window.setTimeout(removeMessage, DEFAULT_DURATION);
}
