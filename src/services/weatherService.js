import { safeLoadJSON, safeSaveJSON } from "../utils/storageUtils.js";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_CACHE_STORAGE_KEY = "weatherCache";
const WEATHER_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutos
const WEATHER_REQUEST_TIMEOUT_MS = 8000; // timeout suave para la request

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidWeatherData(data) {
  if (!isPlainObject(data)) return false;
  const { temperatureC, description, iconCode } = data;
  if (!Number.isFinite(temperatureC)) return false;
  if (typeof description !== "string" || !description.trim()) return false;
  if (!(typeof iconCode === "string" || iconCode === null)) return false;
  return true;
}

function isValidCacheStructure(value) {
  if (!isPlainObject(value)) return false;
  return Object.values(value).every((entry) => {
    if (!isPlainObject(entry)) return false;
    if (!Number.isFinite(entry.timestamp)) return false;
    return isValidWeatherData(entry.data);
  });
}

function isCacheEntryValid(entry) {
  if (!isPlainObject(entry)) return false;
  if (!Number.isFinite(entry.timestamp)) return false;
  const age = Date.now() - entry.timestamp;
  if (age >= WEATHER_CACHE_TTL_MS) return false;
  return isValidWeatherData(entry.data);
}

const persistedCache = safeLoadJSON(WEATHER_CACHE_STORAGE_KEY, {}, isValidCacheStructure);
const weatherCache = { ...persistedCache }; // cityLowerCase -> { timestamp, data }

export async function fetchWeatherByCity(city) {
  if (typeof city !== "string") return null;

  const trimmedCity = city.trim();
  if (!trimmedCity) return null;
  if (!WEATHER_API_KEY || !`${WEATHER_API_KEY}`.trim()) {
    console.warn(
      "[weatherService] Falta VITE_WEATHER_API_KEY. El clima se mostrara como 'no disponible'."
    );
    return null;
  }

  const cityLower = trimmedCity.toLowerCase();
  const cacheEntry = weatherCache[cityLower];
  const staleCacheData =
    isPlainObject(cacheEntry) && isValidWeatherData(cacheEntry.data) ? cacheEntry.data : null;
  if (isCacheEntryValid(cacheEntry)) {
    return cacheEntry.data;
  }

  const url = new URL(WEATHER_BASE_URL);
  url.searchParams.set("q", `${trimmedCity},AR`);
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", "es");
  url.searchParams.set("appid", WEATHER_API_KEY);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WEATHER_REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url.toString(), { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) {
      console.warn(
        `[weatherService] Respuesta no exitosa (${response.status}) para ${trimmedCity}.`
      );
      if (staleCacheData) {
        console.warn("[weatherService] Fallo al actualizar clima, usando datos de cache.");
        return staleCacheData;
      }
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
      if (staleCacheData) {
        console.warn("[weatherService] Datos de clima invalidos, usando cache disponible.");
        return staleCacheData;
      }
      return null;
    }

    const temperatureC = Math.round(temperatureNumber * 10) / 10;
    const description = descriptionRaw.trim();
    const iconCode = typeof iconRaw === "string" ? iconRaw : null;

    const result = { temperatureC, description, iconCode };
    weatherCache[cityLower] = { timestamp: Date.now(), data: result };
    safeSaveJSON(WEATHER_CACHE_STORAGE_KEY, weatherCache);
    return result;
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn(`[weatherService] Error al obtener clima para ${trimmedCity}.`, error);
    if (staleCacheData) {
      console.warn("[weatherService] Error de red/timeout, usando datos de cache.");
      return staleCacheData;
    }
    return null;
  }
}
