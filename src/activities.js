import "./styles.css";
import { activitiesData } from "./data/activitiesData.js";
import { renderActivitiesPage } from "./ui/renderActivitiesPage.js";
import { renderActivityCards } from "./ui/renderActivityCards.js";
import { filterTrails } from "./ui/filterTrails.js";

renderActivitiesPage();
renderActivityCards(activitiesData);

const searchInput = document.getElementById("activitySearch");

if (searchInput) {
  searchInput.addEventListener("input", function (event) {
    const text = event.target.value;
    const filtered = filterTrails(activitiesData, text);
    renderActivityCards(filtered);
  });
}
