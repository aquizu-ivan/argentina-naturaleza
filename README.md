# Naturaleza Argentina
App multipagina para explorar caminatas y actividades en la naturaleza argentina, con clima, mapa interactivo y carrito sin backend.

- Multipagina real con Vite (un entry JS por pagina).
- Listados con filtros en vivo, clima por ciudad y estados vacios claros.
- Mapa interactivo con markers y version textual accesible.
- Carrito y perfil en localStorage con helpers de storage robusto.

---

## Tabla de contenidos
- [Resumen rapido](#resumen-rapido)
- [Stack y enfoque tecnico](#stack-y-enfoque-tecnico)
- [Como correr el proyecto](#como-correr-el-proyecto)
- [Arquitectura y estructura de carpetas](#arquitectura-y-estructura-de-carpetas)
- [Funcionalidades principales](#funcionalidades-principales)
- [Accesibilidad y UX](#accesibilidad-y-ux)
- [Robustez y manejo de errores](#robustez-y-manejo-de-errores)
- [Roadmap / mejoras futuras](#roadmap--mejoras-futuras)

---

## Resumen rapido
- Vite multipagina real (no SPA), con un JS por pagina.
- Listados de caminatas y actividades con filtros y clima por ciudad.
- Mapa interactivo de Argentina con markers y lista accesible de experiencias.
- Carrito de actividades/caminatas y perfil de usuario guardados en localStorage.
- Accesibilidad basica cuidada (skip link, foco visible, aria-live, toasts con roles).
- Responsive trabajado para mobile, tablet y desktop.

---

## Stack y enfoque tecnico
Proyecto front-end 100 % en el navegador: Vite como bundler, JavaScript vanilla modular y HTML multipagina real. Se usa un unico CSS principal para mantener coherencia visual y facilitar el mantenimiento.

No hay backend: el estado de carrito y perfil se persiste en localStorage mediante helpers robustos de lectura/escritura segura. La UI se organiza separando renderizado, datos mock, servicios, almacenamiento y utilidades, de modo que cada pagina tiene su entry JS pero comparte logica comun (filtros, toasts, storage).

---

## Como correr el proyecto

Requisitos:
- Node.js
- npm

Comandos basicos:
```bash
npm install
npm run dev
npm run build
```

Navegacion multipagina (dev server o build): `/` (home), `/caminatas.html`, `/activities.html`, `/carrito.html`, `/perfil.html`, `/mapa.html`, mas las paginas de detalle.

---

## Arquitectura y estructura de carpetas
Arquitectura multipagina con Vite: cada HTML tiene su entry JS; la UI se separa en modulos dentro de `src/ui`, los datos viven en `src/data`, los servicios (clima) en `src/services`, carrito y perfil en carpetas propias, helpers en `src/utils` y un unico `src/styles.css` organizado por secciones.

```
src/
  ui/
    ...
  data/
    ...
  services/
    ...
  cart/
    ...
  profile/
    ...
  utils/
    ...
  styles.css
```

- `src/ui/`: componentes de interfaz y funciones de render para cada pagina (home, caminatas, actividades, detalle, mapa, etc.).
- `src/data/`: datos mockeados de caminatas, actividades y regiones.
- `src/services/weatherService.js`: integracion con OpenWeatherMap para clima por ciudad, con manejo de errores basico.
- `src/cart/`: logica de carrito (lectura/escritura en localStorage, badge, helpers de conteo).
- `src/profile/`: logica del perfil de usuario (carga/guardado de formulario en localStorage).
- `src/utils/`: helpers compartidos (storage robusto, formateadores, etc.).
- `src/styles.css`: estilos globales organizados por secciones (layout, header, hero, cards, filtros, mapa, carrito, perfil, etc.).

Patrones clave:
- Inicializacion por pagina: cada entry JS renderiza su pagina, conecta eventos (filtros, botones) y usa helpers compartidos (filtros, toasts, storage).
- Helpers reutilizables: `setupListFilters` comparte la logica de filtros entre caminatas y actividades; `storageUtils` (`safeLoadJSON`, `safeSaveJSON`) protege lecturas/escrituras en localStorage; `feedbackMessages` unifica los toasts.

---

## Funcionalidades principales

### Home
- Hero con mensaje principal y CTA para explorar caminatas y actividades.
- Acceso rapido a las secciones clave (listados, mapa, carrito/perfil).

### Listados de caminatas y actividades
- Cards generadas dinamicamente desde datos mock.
- Filtros en vivo por texto, region y dificultad.
- Contadores de resultados y mensajes claros cuando no hay coincidencias.
- Logica de filtros reutilizada mediante un helper compartido.

### Clima por ciudad
- Integracion con OpenWeatherMap usando el nombre de la ciudad.
- Estado “Cargando clima…” mientras se realiza el fetch.
- Mensaje claro cuando el clima no esta disponible o hay error.
- Chips de clima embebidos dentro de las cards de caminatas.

### Mapa interactivo
- Mapa estilizado de Argentina con markers de caminatas y actividades.
- Toggles para mostrar/ocultar tipos de experiencias.
- Tooltips con informacion de cada experiencia y link a la pagina de detalle.
- Lista textual accesible de las experiencias visibles en el mapa.

### Carrito
- Agregar caminatas/actividades al carrito desde las cards o el detalle.
- Modificar cantidades, eliminar items y vaciar el carrito.
- Calculo de totales segun los datos de cada experiencia.
- Estado persistido en localStorage con helpers robustos.
- Toasts de feedback al eliminar items o vaciar el carrito.

### Perfil de usuario
- Formulario para guardar nombre, email y otros datos basicos.
- Validaciones simples en el front.
- Guardado de datos en localStorage con helpers seguros.
- Toasts de exito/advertencia para el estado del formulario.

### Accesibilidad basica y UX
- Skip link para saltar al contenido principal.
- Foco visible consistente en enlaces y botones.
- Mensajes dinamicos (resultados de filtros, clima, toasts) con aria-live y roles apropiados.
- Mapa con toggles accesibles y lista paralela para lectores de pantalla.

### Responsive
- Layout adaptado a mobile, tablet y desktop.
- Grillas de cards en 1/2/3 columnas segun ancho.
- Ajustes especificos en detalle, carrito, perfil y mapa para pantallas pequenas.

---

## Accesibilidad y UX

- Lo que ya esta implementado:
  - Estructura y navegacion: `lang="es"`, skip link al inicio, uso de `<main>`, nav con `aria-label` y `aria-current` para marcar la pagina activa.
  - Formularios y filtros: filtros en `<fieldset>` con `<legend>`, labels asociadas, contadores de resultados con `role="status"` y `aria-live="polite"`.
  - Clima, mensajes y toasts: chip de clima con estados de carga/error; mensajes dinamicos (clima, resultados, toasts) anunciables via `aria-live` y roles (`status`, `alert`); toasts contextuales para acciones clave (guardar perfil, eliminar/vaciar carrito).
  - Mapa interactivo: markers como botones con `aria-label` descriptivo, toggles con `aria-pressed`, lista textual accesible de experiencias visibles, tooltip como mini dialogo con foco en Cerrar y retorno al marker.
  - Foco visible y responsive: estilos de `:focus-visible` coherentes y layouts adaptados para que controles no se superpongan ni se salgan del viewport en mobile.

- Posibles mejoras:
  - Asociar mensajes de error de formularios con `aria-describedby`.
  - Agregar un boton accesible de “limpiar filtros” en listados.
  - Respetar `prefers-reduced-motion` para reducir animaciones.
  - Afinar manejo de foco/teclado en el mapa (ej. cerrar tooltip con `Esc`, navegacion entre markers).

---

## Robustez y manejo de errores

- Lo que ya esta implementado:
  - Storage robusto: helpers `safeLoadJSON` / `safeSaveJSON` para leer/escribir en `localStorage`, manejando claves inexistentes o JSON corrupto con defaults seguros y avisos en consola.
  - Perfil y carrito: validaciones simples en perfil antes de guardar; totales del carrito calculados desde datos originales; comportamiento estable incluso con storage viejo o mal formado.
  - Clima y mapa: servicio de clima que distingue errores (API key, red, respuestas inesperadas) y muestra mensajes claros cuando no hay datos; mapa con estados vacios explicitos al no haber experiencias visibles.
  - Feedback de errores/estados vacios: toasts informan acciones clave (guardar perfil, eliminar/vaciar carrito); listados muestran “sin resultados” cuando los filtros no devuelven coincidencias.

- Posibles mejoras:
  - Agregar TTL/cache para respuestas de clima y evitar peticiones repetidas.
  - Implementar timeouts y mensajes especificos cuando el clima tarde o falle.
  - Extender helpers de storage a futuros modulos (favoritos, preferencias).
  - Guardas adicionales en el mapa para datos incompletos de experiencias.

---

## Roadmap / mejoras futuras

- **Accesibilidad 2.5 / 3.0**  
  aria-describedby en errores, boton de limpiar filtros, soporte `prefers-reduced-motion`, mejoras de foco/teclado en mapa y toasts.
- **Performance movil ampliada**  
  Optimizacion y lazy-load de imagenes, reduccion de efectos pesados en baja gama, ajuste de CSS para mejorar carga percibida.
- **Refactor visual y sistema de diseno ligero**  
  Modularizar `styles.css`, consolidar tokens de espaciado/color, limpiar duplicados para mantenimiento.
- **Mejoras en mapa y clima**  
  Cache con TTL y reintentos suaves, mensajes mas claros en fallos de red, posible clustering si crece el dataset.
- **Funcionalidades de producto**  
  Favoritos, filtros avanzados, historial de busquedas o mas metadatos por experiencia, manteniendo enfoque en UX y accesibilidad.
- **Compartir y deep links**  
  Links directos a experiencias o filtros preaplicados para mejorar descubrimiento y compartir contenido.
