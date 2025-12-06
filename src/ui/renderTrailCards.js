import { createTrailCard } from "./createTrailCard.js";

export function renderTrailCards(trails) {
  const grid = document.getElementById("trailsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (!trails || trails.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state results-empty fade-in";

    const title = document.createElement("p");
    title.textContent = "No encontramos caminatas para esta combinación de filtros.";

    const hint = document.createElement("p");
    hint.textContent =
      "Probá limpiar los filtros, elegir otra región/dificultad o volver a la lista completa para seguir explorando.";

    empty.append(title, hint);
    grid.appendChild(empty);
    return;
  }

  trails.forEach(function (trail) {
    const card = createTrailCard(trail);
    grid.appendChild(card);
  });
}
