import { createTrailCard } from "./createTrailCard.js";

export function renderTrailCards(trails) {
  const grid = document.getElementById("trailsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (!trails || trails.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state results-empty fade-in";
    empty.textContent =
      "No encontramos caminatas para estos filtros. Probá ajustar la búsqueda o la región.";
    grid.appendChild(empty);
    return;
  }

  trails.forEach(function (trail) {
    const card = createTrailCard(trail);
    grid.appendChild(card);
  });
}
