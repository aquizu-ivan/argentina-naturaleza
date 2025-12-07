const memoryStorage = {};

let isLocalStorageUsable = false;

const cloneValue = (value) => {
  try {
    if (typeof structuredClone === "function") {
      return structuredClone(value);
    }
    return JSON.parse(JSON.stringify(value));
  } catch (error) {
    console.warn("[storage] No se pudo clonar el valor por defecto, se devolverá la referencia original.", error);
    return value;
  }
};

function detectLocalStorageSupport() {
  try {
    const testKey = "__storage_test__";
    window.localStorage.setItem(testKey, "test");
    window.localStorage.getItem(testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (_error) {
    return false;
  }
}

isLocalStorageUsable = detectLocalStorageSupport();

function getStorageTargets() {
  return {
    primary: isLocalStorageUsable ? window.localStorage : null,
    fallback: memoryStorage
  };
}

export function isStorageInFallbackMode() {
  return !isLocalStorageUsable;
}

export function safeGetItem(key) {
  const { primary, fallback } = getStorageTargets();
  if (primary) {
    try {
      return primary.getItem(key);
    } catch (error) {
      console.warn(`[storage] No se pudo leer "${key}" en localStorage, usando fallback.`, error);
      isLocalStorageUsable = false;
    }
  }
  return Object.prototype.hasOwnProperty.call(fallback, key) ? fallback[key] : null;
}

export function safeSetItem(key, value) {
  const { primary, fallback } = getStorageTargets();
  if (primary) {
    try {
      primary.setItem(key, value);
      return;
    } catch (error) {
      console.warn(`[storage] No se pudo escribir "${key}" en localStorage, usando fallback.`, error);
      isLocalStorageUsable = false;
    }
  }
  fallback[key] = value;
}

export function safeRemoveItem(key) {
  const { primary, fallback } = getStorageTargets();
  if (primary) {
    try {
      primary.removeItem(key);
    } catch (error) {
      console.warn(`[storage] No se pudo borrar "${key}" en localStorage, limpiando fallback.`, error);
      isLocalStorageUsable = false;
    }
  }
  delete fallback[key];
}

/**
 * Lee una clave de storage, la parsea como JSON y devuelve un valor seguro.
 * @param {string} key - Clave en storage.
 * @param {*} defaultValue - Valor por defecto a devolver si no hay datos válidos.
 * @param {(value: any) => boolean} [validateFn] - Función opcional que valida la estructura del valor parseado.
 * @returns {*} Valor seguro (clon del defaultValue si algo falla).
 */
export function safeLoadJSON(key, defaultValue, validateFn) {
  const raw = safeGetItem(key);

  if (raw === null || raw === undefined) {
    return cloneValue(defaultValue);
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    console.warn(`[storage] Error al parsear JSON de "${key}", usando default.`, error);
    return cloneValue(defaultValue);
  }

  if (typeof validateFn === "function") {
    const isValid = Boolean(validateFn(parsed));
    if (!isValid) {
      console.warn(`[storage] Estructura inválida para "${key}", usando default.`);
      return cloneValue(defaultValue);
    }
  }

  return parsed;
}

/**
 * Guarda un valor como JSON en storage sin romper la app si falla.
 * @param {string} key - Clave en storage.
 * @param {*} value - Valor a serializar.
 */
export function safeSaveJSON(key, value) {
  let serialized;
  try {
    serialized = JSON.stringify(value);
  } catch (error) {
    console.warn(`[storage] No se pudo serializar el valor de "${key}".`, error);
    return;
  }

  safeSetItem(key, serialized);
}
