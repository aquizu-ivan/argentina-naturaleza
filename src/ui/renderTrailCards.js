import { createTrailCard } from "./createTrailCard.js";

export function renderTrailCards(trails) {
  const grid = document.getElementById("trailsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (!trails || trails.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state results-empty fade-in";

    const title = document.createElement("p");
    title.textContent = "No hay caminatas para este filtro.";

    const hint = document.createElement("p");
    hint.textContent =
      "Proba otra direccion del territorio o volve a la lista completa para seguir el recorrido.";

    empty.append(title, hint);
    grid.appendChild(empty);
    return;
  }

  trails.forEach(function (trail) {
    const card = createTrailCard(trail);
    grid.appendChild(card);
  });
}