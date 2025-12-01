// Nota: en un entorno real la API key deberia venir de import.meta.env.VITE_WEATHER_API_KEY.
// En esta version demo queda quemada en el codigo.
const WEATHER_API_KEY = "PONER_API_KEY_AQUI"; // TODO: reemplazar por una key real para pruebas
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const weatherCache = new Map(); // cityLowerCase -> resultado (objeto normalizado o null)

export async function fetchWeatherByCity(city) {
  if (typeof city !== "string") return null;

  const trimmedCity = city.trim();
  if (!trimmedCity) return null;

  const cityLower = trimmedCity.toLowerCase();
  if (weatherCache.has(cityLower)) {
    return weatherCache.get(cityLower);
  }

  const url = new URL(WEATHER_BASE_URL);
  url.searchParams.set("q", `${trimmedCity},AR`);
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", "es");
  url.searchParams.set("appid", WEATHER_API_KEY);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      weatherCache.set(cityLower, null);
      return null;
    }

    const data = await response.json();
    const temperatureRaw = data?.main?.temp;
    const descriptionRaw = data?.weather?.[0]?.description;
    const iconRaw = data?.weather?.[0]?.icon;

    const temperatureNumber =
      typeof temperatureRaw === "number"
        ? temperatureRaw
        : Number.parseFloat(temperatureRaw);

    if (!Number.isFinite(temperatureNumber) || typeof descriptionRaw !== "string" || !descriptionRaw.trim()) {
      weatherCache.set(cityLower, null);
      return null;
    }

    const temperatureC = Math.round(temperatureNumber * 10) / 10;
    const description = descriptionRaw.trim();
    const iconCode = typeof iconRaw === "string" ? iconRaw : null;

    const result = { temperatureC, description, iconCode };
    weatherCache.set(cityLower, result);
    return result;
  } catch (error) {
    weatherCache.set(cityLower, null);
    return null;
  }
}
