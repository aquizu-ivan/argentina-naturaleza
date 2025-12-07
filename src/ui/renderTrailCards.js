import { createTrailCard } from "./createTrailCard.js";

export function renderTrailCards(trails) {
  const grid = document.getElementById("trailsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (!trails || trails.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state results-empty fade-in";

    const title = document.createElement("p");
    title.textContent = "Por ahora no hay caminatas para esta combinación de filtros.";

    const hint = document.createElement("p");
    hint.textContent =
      "Podés ajustar los filtros, elegir otra región o volver a la lista completa para seguir el recorrido.";

    empty.append(title, hint);
    grid.appendChild(empty);
    return;
  }

  trails.forEach(function (trail) {
    const card = createTrailCard(trail);
    grid.appendChild(card);
  });
}
