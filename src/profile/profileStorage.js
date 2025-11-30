const PROFILE_KEY = "naturaleza-profile";

export function getProfile() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
    return null;
  } catch (error) {
    console.warn("No se pudo leer el perfil:", error);
    return null;
  }
}

export function saveProfile(profile) {
  if (typeof window === "undefined" || !window.localStorage) return null;
  try {
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile || {}));
    return profile;
  } catch (error) {
    console.warn("No se pudo guardar el perfil:", error);
    return null;
  }
}

export function clearProfile() {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.removeItem(PROFILE_KEY);
  } catch (error) {
    console.warn("No se pudo limpiar el perfil:", error);
  }
}
