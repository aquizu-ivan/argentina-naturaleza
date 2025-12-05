# Elevator pitch (30–60 segundos)
Naturaleza Argentina es una app multipagina en vanilla JS para explorar caminatas y actividades al aire libre en Argentina. Simula un producto real: listados con filtros, detalle con CTA al carrito, mapa accesible, clima integrado y estados vacios guiados. Demuestra arquitectura modular sin frameworks pesados, accesibilidad aplicada, optimizaciones de performance y resiliencia de red.

En menos de un minuto: multipagina con Vite, UI modular, storage en localStorage, clima con cache/TTL/timeout/fallback, mapa accesible con tooltip dialogal y toasts de feedback. Pensado como pieza principal de portfolio para mostrar criterio de producto y tecnica.

# Recorrido guiado por la app (demo script)
- Home: mostrar hero y narrativa; explicar CTA a caminatas y actividades.
- Caminatas: aplicar filtros en vivo (texto/region/dificultad), ver contador y boton “Limpiar filtros”; forzar estado vacio para mostrar mensajes guiados.
- Actividades: repetir patron de filtros y estado vacio; consistencia de UX.
- Detalle: abrir una caminata/actividad; ver info clave, beneficios y CTA “Añadir al carrito”; mencionar chip de clima cuando aplica.
- Carrito: agregar desde cards/detalle, mostrar persistencia en localStorage; cambiar cantidades, eliminar, vaciar; ver toasts y estado vacio.
- Perfil: completar formulario; mostrar validacion accesible (errores por campo, resumen aria-live assertive, foco en primer campo invalido); guardar y ver toasts.
- Mapa: mostrar markers y toggles; abrir tooltip (dialogo con focus trap, cierre con Esc, retorno del foco); revisar lista textual accesible y live region que anuncia cambios; forzar estado vacio y leer mini guia de uso.

# Arquitectura – como explicarla en una entrevista
- Multipagina real (no SPA): cada HTML tiene su entry JS; elegi esta arquitectura para simular sitios reales y mantener carga inicial simple sin frameworks.
- Capas/carpetas:
  - `src/ui`: renders y componentes (cards, listas, detalle, mapa, toasts, estados vacios).
  - `src/data`: mocks de caminatas, actividades, regiones del mapa.
  - `src/services`: clima (`weatherService` con cache/TTL/timeout/fallback).
  - `src/cart`, `src/profile`: logica encapsulada de carrito y perfil.
  - `src/utils`: helpers como `storageUtils` (safeLoadJSON/safeSaveJSON), formateadores, filtros.
  - `src/styles.css`: unica hoja, seccionada por bloques y con tokens en :root.
- Separacion de responsabilidades: UI no conoce detalles de storage o clima; servicios y helpers son reutilizables; estructura defendible para perfil junior.

# Accesibilidad – puntos clave para mencionar
- Skip-link al contenido principal; landmarks correctos sin main anidado; titles normalizados por pagina.
- Filtros con `fieldset` + `legend` + `label`; contadores con `aria-live`.
- Perfil: `aria-invalid` y `aria-describedby` por campo, resumen de errores en `aria-live="assertive"`, foco en el primer campo invalido, toasts de exito/advertencia.
- Mapa: regiones con `role="region"` y `aria-label/aria-labelledby`; tooltip como `role="dialog"` con `aria-modal`, focus trap, cierre con Esc y retorno del foco; lista textual paralela y live region que anuncia experiencias visibles.
- Prefers-reduced-motion: CSS reduce animaciones y desactiva scroll suave; JS marca `.fade-in` como visibles sin animar.

# Clima y resiliencia de red – como contarlo
- Uso de OpenWeather; datos normalizados (temperatura redondeada, descripcion, icono).
- Cache en memoria + persistencia en localStorage; TTL de 10 minutos por ciudad.
- Timeout suave de 8s con AbortController; fallback a cache “stale” si hay timeout/red/status no OK o datos invalidos.
- Mensaje de discurso: “No dejo al usuario esperando: si la API tarda, corto a los 8s; si falla, uso el ultimo dato valido o muestro ‘clima no disponible’ sin romper la UI.”

# Performance y robustez – discurso breve
- Imagenes: `loading="lazy"` y `decoding="async"` en cards; `width`/`height` fijos en cards (400x260) y detalle (1200x720) para evitar layout shift.
- Storage robusto: `safeLoadJSON`/`safeSaveJSON` en carrito, perfil y clima para tolerar JSON corrupto y claves inexistentes.
- Estados vacios guiados: siempre hay mensajes claros, nunca pantallas en blanco.
- Reduced motion: respeto de preferencias del usuario, con degradacion elegante de animaciones.
- Eleccion de optimizaciones: foco en beneficios altos con bajo costo (lazy-load, cache/TTL, timeout, mensajes claros) para un proyecto de portfolio.

# Riesgos aceptados y mejoras futuras – como responder “que mejorarias?”
- CSS: modularizar `styles.css` en bloques separados si el proyecto creciera mucho.
- Imagenes: añadir `srcset`/`<picture>` y optimizar peso real de assets para redes lentas.
- Mapa: navegacion de teclado mas avanzada (recorrido entre markers con atajos dedicados).
- Tests: sumar unitarios/integracion ligera para flujos clave (carrito, clima, perfil).
- Metricas: medir y documentar con Lighthouse para mostrar resultados concretos.
- Mensaje clave: el proyecto esta completo para portfolio; estas mejoras son de siguiente nivel, no deudas criticas.
