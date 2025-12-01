import { fetchWeatherByCity } from "../services/weatherService.js";

export function createWeatherChip(city) {
  const chip = document.createElement("div");
  chip.className = "card__weather";
  chip.textContent = "Cargando clima...";

  if (typeof city !== "string" || !city.trim()) {
    chip.textContent = "Clima no disponible";
    return chip;
  }

  fetchWeatherByCity(city)
    .then(function (result) {
      if (!result) {
        chip.textContent = "Clima no disponible";
        return;
      }

      const { temperatureC, description } = result;
      chip.textContent = `${temperatureC}°C · ${description}`;
    })
    .catch(function () {
      chip.textContent = "Clima no disponible";
    });

  return chip;
}
