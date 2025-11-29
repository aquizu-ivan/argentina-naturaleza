import "./styles.css";
import { trailsData } from "./data/trailsData.js";
import { renderApp } from "./ui/renderApp.js";
import { renderTrailCards } from "./ui/renderTrailCards.js";
import { filterTrails } from "./ui/filterTrails.js";

renderApp(trailsData);
renderTrailCards(trailsData);

const searchInput = document.getElementById("trailSearch");

if (searchInput) {
  searchInput.addEventListener("input", function (event) {
    const text = event.target.value;
    const filtered = filterTrails(trailsData, text);
    renderTrailCards(filtered);
  });
}
