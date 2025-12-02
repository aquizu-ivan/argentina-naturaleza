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

/**
 * Lee una clave de localStorage, la parsea como JSON y devuelve un valor seguro.
 * @param {string} key - Clave en localStorage.
 * @param {*} defaultValue - Valor por defecto a devolver si no hay datos válidos.
 * @param {(value: any) => boolean} [validateFn] - Función opcional que valida la estructura del valor parseado.
 * @returns {*} Valor seguro (clon del defaultValue si algo falla).
 */
export function safeLoadJSON(key, defaultValue, validateFn) {
  let raw;
  try {
    raw = localStorage.getItem(key);
  } catch (error) {
    console.warn(`[storage] No se pudo leer la clave "${key}" de localStorage, usando default.`, error);
    return cloneValue(defaultValue);
  }

  if (raw === null) {
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
 * Guarda un valor como JSON en localStorage sin romper la app si falla.
 * @param {string} key - Clave en localStorage.
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

  try {
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.warn(`[storage] No se pudo guardar la clave "${key}" en localStorage.`, error);
  }
}
