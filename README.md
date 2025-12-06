# Naturaleza Argentina

Obra web interactiva para explorar caminatas y actividades al aire libre en Argentina. Permite descubrir experiencias, ver detalles clave, guardar un perfil local y armar un carrito de recorridos sin backend. Pensada como pieza destacada de un perfil profesional frontend.

## Qué podés hacer
- Explorar caminatas y actividades con filtros en tiempo real.
- Ver detalles con duración, dificultad, ubicación, beneficios e imágenes.
- Armar un carrito de experiencias (persistencia en `localStorage`, sin backend real).
- Guardar tu perfil de contacto de forma local en el navegador.
- Consultar un mapa conceptual de experiencias (placeholder interactivo actual).
- Ver clima básico por experiencia mediante un servicio encapsulado (si está activo).

## Stack y arquitectura
- **Stack**: Vite multipágina, JavaScript vanilla, HTML, CSS único.
- **Estructura**:
  - `src/ui/`: componentes y render de páginas y vistas.
  - `src/data/`: datasets mock de caminatas y actividades.
  - `src/cart/`, `src/profile/`: estado local y persistencia en `localStorage` para carrito y perfil.
  - `src/services/weatherService.js`: integración de clima encapsulada.
  - `src/utils/`: helpers compartidos (formatos, aria-live, storage).

## Guía técnica rápida (para desarrolladores)
- Punto de entrada: estructura multipágina real (no hay framework de rutas); cada HTML monta su vista desde `src/ui/`.
- Dónde mirar en `src/`:
  - `ui/`: funciones de render y componentes de página.
  - `data/`: datasets estáticos de experiencias.
  - `cart/` y `profile/`: manejo de estado en `localStorage` para carrito y perfil.
  - `services/weatherService.js`: obtención de clima encapsulada.
  - `utils/`: helpers reutilizables (formatos, aria-live, storage).
- Decisiones clave: UI modular por funciones, estados vacíos y mensajes accesibles integrados, aria-live para filtros y carrito, foco gestionado y breadcrumbs semánticos.
- Qué evaluar al revisar: claridad de los renders en `ui/`, tratamiento de estados vacíos y feedback, uso de helpers en `utils/`, consistencia de copy y accesibilidad.

## Accesibilidad y UX
- Skip-link y `<main>` único por página.
- Breadcrumbs en vistas de detalle.
- Foco gestionado: h1 enfocable al cargar, retorno de foco en tooltip del mapa.
- Regiones `aria-live` para filtros, carrito y acciones de añadir/quitar/actualizar.
- Mensajes claros de estados vacíos y feedback textual.
- Foco visible en links, botones y controles interactivos.
- Trabajado con intención accesible; no es perfecto pero está encaminado.

## Cómo correr el proyecto
Requisitos: Node.js y npm.

Comandos:
- `npm install`
- `npm run dev` (Vite levanta habitualmente en `http://localhost:5173`)
- `npm run build` (compilación de producción)

Páginas de entrada (multipágina): `index.html` (home), `caminatas.html`, `activities.html`, `caminata-detalle.html`, `actividad-detalle.html`, `carrito.html`, `perfil.html`, `mapa.html`.

## Recorrido sugerido
1. Entrar a la home (`index.html`).
2. Explorar caminatas y actividades con sus filtros.
3. Abrir un detalle y añadir al carrito.
4. Revisar el carrito y ajustar cantidades.
5. Completar tu perfil local.
6. Pasar por el mapa conceptual para ver la lista visible de experiencias.

## Estado actual y mejoras posibles
- El mapa es un placeholder conceptual listo para una integración real.
- El clima está encapsulado y puede ampliarse o conectarse a un servicio real.
- Hay margen para optimizar imágenes y performance si la obra crece.
- Pensada como pieza principal de perfil profesional; se puede profundizar en narrativa y exportabilidad en futuros tickets.
