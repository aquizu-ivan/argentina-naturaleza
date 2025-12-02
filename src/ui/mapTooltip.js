export function createMapTooltip(containerElement) {
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

  function showTooltip(marker, markerElement) {
    if (!markerElement) return;

    const typeLabel = marker.type === "trail" ? "Caminata" : "Actividad";
    const regionText = marker.region || "Argentina";
    const difficulty = marker.difficulty
      ? `<p class="map__tooltip-detail">Dificultad: ${marker.difficulty}</p>`
      : "";

    tooltip.innerHTML = `
      <h3 class="map__tooltip-title">${marker.title}</h3>
      <p class="map__tooltip-type">${typeLabel}</p>
      <p class="map__tooltip-detail">Región: ${regionText}</p>
      ${difficulty}
      <a class="map__tooltip-link" href="${marker.href}">Ver detalle</a>
    `;

    tooltip.style.display = "block";
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";

    requestAnimationFrame(function () {
      positionTooltip(markerElement);
      tooltip.style.visibility = "visible";
      tooltip.style.opacity = "1";
    });
  }

  function hideTooltip() {
    tooltip.style.display = "none";
    tooltip.style.opacity = "0";
  }

  return { showTooltip, hideTooltip };
}
