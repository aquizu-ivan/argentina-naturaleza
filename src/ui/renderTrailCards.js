import { createTrailCard } from "./createTrailCard.js";

export function renderTrailCards(trails) {
  const grid = document.getElementById("trailsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  trails.forEach(function (trail) {
    const card = createTrailCard(trail);
    grid.appendChild(card);
  });
}
