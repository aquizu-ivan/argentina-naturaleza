const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

let tooltipKeydownHandler = null;
let currentTriggerElement = null;

export function createMapTooltip(containerElement, { onClose } = {}) {
  if (!containerElement) return { showTooltip: () => {}, hideTooltip: () => {} };

  const tooltip = document.createElement("div");
  tooltip.className = "map__tooltip";
  tooltip.style.display = "none";
  containerElement.appendChild(tooltip);

  tooltip.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  function positionTooltip(markerElement) {
    const canvasRect = containerElement.getBoundingClientRect();
    const markerRect = markerElement.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    const padding = 12;
    const verticalOffset = 12;
    const markerCenterX = markerRect.left + markerRect.width / 2;

    let left = markerCenterX - canvasRect.left - tooltipRect.width / 2;
    let top = markerRect.top - canvasRect.top - tooltipRect.height - verticalOffset;

    if (top < padding) {
      top = markerRect.bottom - canvasRect.top + verticalOffset;
    }

    const maxLeft = canvasRect.width - tooltipRect.width - padding;
    const maxTop = canvasRect.height - tooltipRect.height - padding;

    left = Math.max(padding, Math.min(left, maxLeft));
    top = Math.max(padding, Math.min(top, maxTop));

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  function showTooltip(marker, markerElement, { focus = false } = {}) {
    if (!markerElement) return;

    currentTriggerElement = focus ? markerElement : null;

    const typeLabel = marker.type === "trail" ? "Caminata" : "Actividad";
    const regionText = marker.region || "Argentina";
    const difficulty = marker.difficulty
      ? `<p class="map__tooltip-detail">Dificultad: ${marker.difficulty}</p>`
      : "";

    const markerIdSuffix = marker.id || "experience";
    const titleId = `mapTooltipTitle-${markerIdSuffix}`;
    const bodyId = `mapTooltipBody-${markerIdSuffix}`;
    tooltip.innerHTML = `
      <button class="map__tooltip-close" type="button" aria-label="Cerrar informaci\u00f3n">\u00d7</button>
      <h3 class="map__tooltip-title" id="${titleId}">${marker.title}</h3>
      <div class="map__tooltip-body" id="${bodyId}">
        <p class="map__tooltip-type">${typeLabel}</p>
        <p class="map__tooltip-detail">Regi\u00f3n: ${regionText}</p>
        ${difficulty}
        <a class="map__tooltip-link" href="${marker.href}">Ver detalle</a>
      </div>
    `;
    tooltip.setAttribute("role", "dialog");
    tooltip.setAttribute("aria-modal", "true");
    tooltip.setAttribute("aria-labelledby", titleId);
    tooltip.setAttribute("aria-describedby", bodyId);

    const closeButton = tooltip.querySelector(".map__tooltip-close");
    const detailLink = tooltip.querySelector(".map__tooltip-link");

    tooltip.style.display = "block";
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";

    const focusableElements = Array.from(
      tooltip.querySelectorAll(FOCUSABLE_SELECTOR)
    ).filter(function (el) {
      return !el.hasAttribute("disabled");
    });

    if (closeButton) {
      closeButton.addEventListener("click", function (event) {
        event.stopPropagation();
        hideTooltip();
      });
    }

    if (tooltipKeydownHandler) {
      tooltip.removeEventListener("keydown", tooltipKeydownHandler);
      tooltipKeydownHandler = null;
    }

    function handleKeydown(event) {
      const isEscape = event.key === "Escape" || event.key === "Esc";
      const isTab = event.key === "Tab";

      if (isEscape) {
        event.preventDefault();
        event.stopPropagation();
        hideTooltip();
        return;
      }

      if (!isTab || focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;
      const isShift = event.shiftKey;

      if (!isShift && activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (isShift && activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    }

    tooltipKeydownHandler = handleKeydown;
    tooltip.addEventListener("keydown", handleKeydown);

    requestAnimationFrame(function () {
      positionTooltip(markerElement);
      tooltip.style.visibility = "visible";
      tooltip.style.opacity = "1";
      if (focus) {
        if (closeButton) {
          closeButton.focus();
        } else if (detailLink) {
          detailLink.focus();
        }
      }
    });
  }

  function hideTooltip({ restoreFocus = true } = {}) {
    tooltip.style.display = "none";
    tooltip.style.opacity = "0";
    if (tooltipKeydownHandler) {
      tooltip.removeEventListener("keydown", tooltipKeydownHandler);
      tooltipKeydownHandler = null;
    }
    const shouldCallOnClose = restoreFocus && typeof onClose === "function";
    if (restoreFocus && currentTriggerElement && document.contains(currentTriggerElement)) {
      currentTriggerElement.focus();
    }
    if (shouldCallOnClose) {
      onClose();
    }
    currentTriggerElement = null;
  }

  return { showTooltip, hideTooltip };
}
