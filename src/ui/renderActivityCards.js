import { createActivityCard } from "./createActivityCard.js";

export function renderActivityCards(activities) {
  const grid = document.getElementById("activitiesGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (!activities || activities.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state results-empty fade-in";

    const title = document.createElement("p");
    title.textContent = "No hay actividades para este filtro.";

    const hint = document.createElement("p");
    hint.textContent =
      "Proba otra direccion del territorio o volve a la lista completa para seguir explorando.";

    empty.append(title, hint);
    grid.appendChild(empty);
    return;
  }

  activities.forEach(function (activity) {
    const card = createActivityCard(activity);
    grid.appendChild(card);
  });
}