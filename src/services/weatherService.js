const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const weatherCache = new Map(); // cityLowerCase -> resultado (objeto normalizado o null)

export async function fetchWeatherByCity(city) {
  if (typeof city !== "string") return null;

  const trimmedCity = city.trim();
  if (!trimmedCity) return null;
  if (!WEATHER_API_KEY || !`${WEATHER_API_KEY}`.trim()) {
    console.warn(
      "[weatherService] Falta VITE_WEATHER_API_KEY. El clima se mostrará como 'no disponible'."
    );
    return null;
  }

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
      console.warn(
        `[weatherService] Respuesta no exitosa (${response.status}) para ${trimmedCity}.`
      );
      weatherCache.set(cityLower, null);
      return null;
    }

    const data = await response.json();
    const temperatureRaw = data?.main?.temp;
    const descriptionRaw = data?.weather?.[0]?.description;
    const iconRaw = data?.weather?.[0]?.icon;

    const temperatureNumber =
      typeof temperatureRaw === "number" ? temperatureRaw : Number.parseFloat(temperatureRaw);

    if (
      !Number.isFinite(temperatureNumber) ||
      typeof descriptionRaw !== "string" ||
      !descriptionRaw.trim()
    ) {
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
    console.warn(`[weatherService] Error al obtener clima para ${trimmedCity}.`, error);
    weatherCache.set(cityLower, null);
    return null;
  }
}
