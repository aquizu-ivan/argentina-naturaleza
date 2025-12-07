import { fetchWeatherByCity } from "../services/weatherService.js";

export function createWeatherChip(city) {
  if (typeof city !== "string" || !city.trim()) {
    return null;
  }

  const chip = document.createElement("div");
  chip.className = "card__weather";
  chip.setAttribute("role", "status");
  chip.setAttribute("aria-live", "polite");
  chip.textContent = "Cargando clima.";

  fetchWeatherByCity(city)
    .then(function (result) {
      if (!result) {
        chip.remove();
        return;
      }

      const { temperatureC, description } = result;
      chip.textContent = `${temperatureC}\u00b0C | ${description}`;
    })
    .catch(function () {
      chip.remove();
    });

  return chip;
}
