import { createActivityCard } from "./createActivityCard.js";

export function renderActivityCards(activities) {
  const grid = document.getElementById("activitiesGrid");
  if (!grid) return;

  grid.innerHTML = "";

  activities.forEach(function (activity) {
    const card = createActivityCard(activity);
    grid.appendChild(card);
  });
}
