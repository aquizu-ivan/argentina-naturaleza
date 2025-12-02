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

    const markerCenterX = markerRect.left + markerRect.width / 2;
    let left = markerCenterX - canvasRect.left;
    let top = markerRect.top - canvasRect.top - tooltip.offsetHeight - 12;

    const maxLeft = canvasRect.width - tooltip.offsetWidth - 8;
    left = Math.max(8, Math.min(left - tooltip.offsetWidth / 2, maxLeft));

    if (top < 8) {
      top = markerRect.bottom - canvasRect.top + 12;
    }

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
