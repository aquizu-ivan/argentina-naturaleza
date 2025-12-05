# Naturaleza Argentina
App multipagina para explorar caminatas y actividades al aire libre en Argentina, pensada como pieza principal de portfolio front-end.

## Vision general
Aplicacion web multipagina que permite descubrir experiencias (caminatas y actividades), ver detalles, agregarlas al carrito, gestionar un perfil basico y explorar un mapa accesible. El foco es mostrar dominio de arquitectura modular en vanilla JS, accesibilidad aplicada y decisiones tecnicas cercanas a un producto real.

## Funcionalidades principales
- Listados de caminatas y actividades con filtros en vivo (texto, region, dificultad), contador de resultados y estados vacios guiados.
- Detalle de experiencias con informacion ampliada y CTA al carrito.
- Carrito persistente en localStorage con totales, modificaciones y toasts de feedback.
- Perfil de usuario con validacion accesible (aria-invalid/aria-describedby, resumen de errores, foco).
- Mapa interactivo de Argentina con markers, tooltip accesible (dialogo con focus trap), lista textual y live region de resultados.
- Clima integrado por ciudad con cache + TTL + timeout + fallback a cache stale.
- Soporte de prefers-reduced-motion en CSS y JS para bajar animaciones.

## Stack y herramientas
- Vite + JavaScript vanilla.
- HTML + un unico CSS principal con tokens en :root.
- Sin backend: estado en localStorage (carrito, perfil, clima) con helpers robustos.
- API de clima: OpenWeather via `import.meta.env.VITE_WEATHER_API_KEY`.

## Como correr el proyecto
Requisitos: Node.js y npm.

Pasos:
```bash
npm install
npm run dev
npm run build
npm run preview
```

API key de clima:
- Crear un archivo `.env` (o `.env.local`) con `VITE_WEATHER_API_KEY=tu_api_key`.
- Si no se configura, el clima se degrada a "no disponible" sin romper la app.

## Arquitectura (alto nivel)
- Multipagina real: cada HTML tiene su entry JS (`src/main.js`, `src/trails.js`, `src/activities.js`, `src/trailDetail.js`, `src/activityDetail.js`, `src/cart.js`, `src/profile.js`, `src/map.js`).
- Carpetas:
  - `src/ui`: render de UI (cards, listados, detalle, mapa, tooltips, toasts, estados vacios).
  - `src/data`: datos mock (caminatas, actividades, regiones del mapa).
  - `src/services`: servicios como `weatherService` (cache/TTL/timeout/fallback).
  - `src/cart`, `src/profile`: logica propia de carrito y perfil.
  - `src/utils`: helpers compartidos (`storageUtils` con `safeLoadJSON`/`safeSaveJSON`, formateadores, filtros).
  - `src/styles.css`: unica hoja de estilos, secciones por bloque (layout, header, hero, listados, detalle, carrito, perfil, mapa, toasts, utils) y tokens (`--space-*`, `--radius-*`, `--shadow-card`, etc.).
- Helpers clave: `storageUtils` protege lecturas/escrituras en localStorage; `weatherService` normaliza clima con cache y resiliencia; helpers de filtros y `feedbackMessages` para toasts.

## Accesibilidad y UX
- Lang, skip-link y landmarks sin main anidado; titles normalizados por pagina.
- Filtros con `fieldset`/`legend`/`label` y contadores con `aria-live`.
- Perfil: aria-invalid/aria-describedby por campo, resumen de errores en `aria-live="assertive"`, foco en el primer campo invalido; toasts de exito/advertencia.
- Mapa: regiones con `role="region"` y `aria-label`/`aria-labelledby`, tooltip como dialogo con focus trap, cierre con Esc y retorno del foco; lista textual paralela y live region de resultados.
- Estados vacios guiados en listados y mapa con mensajes y sugerencias claras.
- Prefers-reduced-motion en CSS y en el helper de fade-in (marca visibles sin animar).

## Performance y robustez
- Clima: cache en memoria + localStorage, TTL 10 min, timeout suave 8s con AbortController, fallback a cache stale ante errores; API publica estable (dato normalizado o null).
- Imagenes: cards con `loading="lazy"`, `decoding="async"`, `width=400` y `height=260`; detalle con `decoding="async"`, `loading="lazy"` y `width=1200`/`height=720` para reducir layout shift.
- Storage robusto: `safeLoadJSON`/`safeSaveJSON` en carrito, perfil y clima.
- Estados vacios y mensajes claros evitan pantallas rotas; toasts informan acciones clave.

## Mejoras futuras (opcionales)

El proyecto está listo para usarse como pieza principal de portfolio. Algunas mejoras que podrían explorarse a futuro, ya en un siguiente nivel, son:

- Navegación de teclado más avanzada en el mapa (recorrido entre markers y lista textual con atajos específicos).
- Imágenes responsive con `srcset`/`<picture>` y optimización de peso de assets para escenarios de red más exigentes.
- División del CSS en módulos (layout, componentes, vistas) si el proyecto creciera en funcionalidades.
- Tests básicos (unitarios o de integración ligera) para flujos clave como carrito, perfil y clima.
- Medición y documentación de performance (por ejemplo con Lighthouse) para mostrar métricas concretas en el portfolio.

## Autor
Proyecto desarrollado por Ivan Aquizu como pieza principal de portfolio front-end.
