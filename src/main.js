import "./styles.css";
import { trailsData } from "./data/trailsData.js";
import { renderApp, renderTrailCards } from "./ui/renderApp.js";
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
