let tooltipKeydownHandler = null;

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

    const typeLabel = marker.type === "trail" ? "Caminata" : "Actividad";
    const regionText = marker.region || "Argentina";
    const difficulty = marker.difficulty
      ? `<p class="map__tooltip-detail">Dificultad: ${marker.difficulty}</p>`
      : "";

    const titleId = "mapTooltipTitle";
    tooltip.innerHTML = `
      <button class="map__tooltip-close" type="button" aria-label="Cerrar información">×</button>
      <h3 class="map__tooltip-title" id="${titleId}">${marker.title}</h3>
      <p class="map__tooltip-type">${typeLabel}</p>
      <p class="map__tooltip-detail">Región: ${regionText}</p>
      ${difficulty}
      <a class="map__tooltip-link" href="${marker.href}">Ver detalle</a>
    `;
    tooltip.setAttribute("role", "dialog");
    tooltip.setAttribute("aria-labelledby", titleId);

    const closeButton = tooltip.querySelector(".map__tooltip-close");
    const detailLink = tooltip.querySelector(".map__tooltip-link");
    if (closeButton) {
      closeButton.addEventListener("click", function (event) {
        event.stopPropagation();
        hideTooltip();
      });
    }
    if (tooltipKeydownHandler) {
      document.removeEventListener("keydown", tooltipKeydownHandler);
      tooltipKeydownHandler = null;
    }

    function handleKeydown(event) {
      if (event.key === "Escape" || event.key === "Esc") {
        event.preventDefault();
        event.stopPropagation();
        hideTooltip();
      }
    }

    tooltipKeydownHandler = handleKeydown;
    document.addEventListener("keydown", handleKeydown);

    tooltip.style.display = "block";
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";

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
      document.removeEventListener("keydown", tooltipKeydownHandler);
      tooltipKeydownHandler = null;
    }
    if (restoreFocus && typeof onClose === "function") {
      onClose();
    }
  }

  return { showTooltip, hideTooltip };
}
