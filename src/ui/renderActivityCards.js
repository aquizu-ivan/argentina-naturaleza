import { createActivityCard } from "./createActivityCard.js";

export function renderActivityCards(activities) {
  const grid = document.getElementById("activitiesGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (!activities || activities.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state results-empty fade-in";

    const title = document.createElement("p");
    title.textContent = "No encontramos actividades para esta combinaci\u00f3n de filtros.";

    const hint = document.createElement("p");
    hint.textContent = "Prob\u00e1 limpiar los filtros o elegir otra regi\u00f3n/dificultad.";

    empty.append(title, hint);
    grid.appendChild(empty);
    return;
  }

  activities.forEach(function (activity) {
    const card = createActivityCard(activity);
    grid.appendChild(card);
  });
}
