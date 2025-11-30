import { createActivityCard } from "./createActivityCard.js";

export function renderActivityCards(activities) {
  const grid = document.getElementById("activitiesGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (!activities || activities.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state fade-in";
    empty.textContent = "No encontramos resultados para tu búsqueda. Probá con otro término o explorá todas las opciones.";
    grid.appendChild(empty);
    return;
  }

  activities.forEach(function (activity) {
    const card = createActivityCard(activity);
    grid.appendChild(card);
  });
}
