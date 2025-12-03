# Naturaleza Argentina

App multipágina para explorar caminatas y actividades en la naturaleza argentina, con clima, mapa interactivo y carrito sin backend.

- Multipágina real con Vite (un entry JS por página).
- Listados con filtros en vivo, clima por ciudad y estados vacíos claros.
- Mapa interactivo con markers y versión textual accesible.
- Carrito y perfil en localStorage con helpers de storage robusto.

---

## Tabla de contenidos

- [Resumen rápido](#resumen-rápido)
- [Stack y enfoque técnico](#stack-y-enfoque-técnico)
- [Cómo correr el proyecto](#cómo-correr-el-proyecto)
- [Arquitectura y estructura de carpetas](#arquitectura-y-estructura-de-carpetas)
- [Funcionalidades principales](#funcionalidades-principales)
- [Accesibilidad y UX](#accesibilidad-y-ux)
- [Robustez y manejo de errores](#robustez-y-manejo-de-errores)
- [Roadmap / mejoras futuras](#roadmap--mejoras-futuras)

---

## Resumen rápido

- Vite multipágina real (no SPA), con un JS por página.
- Listados de caminatas y actividades con filtros y clima por ciudad.
- Mapa interactivo de Argentina con markers y lista accesible de experiencias.
- Carrito de actividades/caminatas y perfil de usuario guardados en localStorage.
- Accesibilidad básica cuidada (skip link, foco visible, aria-live, toasts con roles).
- Responsive trabajado para mobile, tablet y desktop.

---

## Stack y enfoque técnico

Proyecto front-end 100 % en el navegador: Vite como bundler, JavaScript vanilla modular y HTML multipágina real. Se usa un único CSS principal para mantener coherencia visual y facilitar el mantenimiento.

No hay backend: el estado de carrito y perfil se persiste en localStorage mediante helpers robustos de lectura/escritura segura. La UI se organiza separando renderizado, datos mock, servicios, almacenamiento y utilidades, de modo que cada página tiene su entry JS pero comparte lógica común (filtros, toasts, storage).

---

## Cómo correr el proyecto

### Requisitos

- Node.js
- npm

### Comandos básicos

```bash
npm install
npm run dev
npm run build
El proyecto es una app multipágina. Desde el dev server o el build podés navegar a:

/ (home)

/caminatas.html

/activities.html

/carrito.html

/perfil.html

/mapa.html

y las páginas de detalle correspondientes.

Arquitectura y estructura de carpetas
La aplicación está construida como un proyecto front-end multipágina con Vite: cada página HTML tiene su propio entry JS y la lógica de UI se organiza en módulos reutilizables. Los datos de negocio (caminatas, actividades, regiones del mapa) están aislados en ficheros de datos, mientras que el estado del usuario (carrito y perfil) se persiste en localStorage a través de helpers de storage robusto.

La estructura de carpetas principal es:

text
Copiar código
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
Resumen de responsabilidades:

src/ui/
Componentes de interfaz y funciones de render de cada página: home, listados de caminatas y actividades, páginas de detalle, mapa interactivo, cabecera, toasts, etc. Cada entry JS se apoya en estos módulos para montar la vista.

src/data/
Datos mockeados de caminatas y actividades (provincias, regiones, dificultad, precio, descripciones), además de la información de regiones del mapa usada para posicionar markers.

src/services/
Servicios externos. El principal es weatherService, que integra la API de clima (OpenWeatherMap), gestiona la API key, maneja errores de red y devuelve estructuras seguras para la UI.

src/cart/
Lógica de carrito: helpers para leer y escribir en localStorage, calcular totales, contar ítems, actualizar el badge del header y exponer una API simple al resto de la app.

src/profile/
Lógica de perfil de usuario: carga y guardado del formulario en localStorage, validaciones básicas y funciones para exponer un perfil “seguro” a la UI aunque los datos del storage estén corruptos.

src/utils/
Helpers compartidos como:

storageUtils (safeLoadJSON, safeSaveJSON) para leer y escribir JSON de forma tolerante a errores.

Formateadores (por ejemplo, de precio) y utilidades reutilizables.

Otros helpers pequeños que no pertenecen a un dominio concreto.

src/styles.css
Estilos globales de la app, organizados por secciones (layout general, header y navegación, home/hero, listados y cards, filtros, mapa, carrito, perfil, feedback/toasts, etc.). Es un único archivo, pero estructurado con bloques y comentarios para facilitar el mantenimiento.

Patrón de inicialización por página
Cada entry JS de la aplicación sigue un patrón similar:

Renderiza la página correspondiente usando funciones de src/ui/.

Conecta listeners y wiring de eventos (filtros, botones, toggles del mapa, etc.).

Utiliza helpers compartidos para lógica común:

Filtros y contadores de resultados.

Actualización del badge del carrito en el header.

Toasters de feedback para acciones clave.

Storage robusto para leer y escribir estado.

Helpers reutilizables clave
Algunos helpers destacan dentro de la arquitectura:

setupListFilters
Conecta los filtros (texto, región, dificultad) de caminatas y actividades con la lógica de filtrado (filterTrails) y los contadores de resultados, evitando duplicación entre páginas.

storageUtils (safeLoadJSON, safeSaveJSON)
Encapsulan el acceso a localStorage para que el proyecto tolere claves corruptas o ausentes sin romper la app. Se utilizan tanto en el carrito como en el perfil.

feedbackMessages
Gestiona la infraestructura de toasts (HTML + CSS + comportamiento), permitiendo mostrar mensajes de éxito, información o advertencia de forma consistente en todo el sitio.

Funcionalidades principales
Home
Hero principal con mensaje claro sobre el propósito de la app (explorar experiencias de naturaleza en Argentina).

CTAs para ir a las secciones clave: caminatas, actividades, mapa interactivo.

Diseño pensado como punto de entrada al portfolio, mostrando desde el inicio que es una app multipágina real.

Listados de caminatas y actividades
Listados dinámicos: las cards se generan desde datos mockeados de src/data/ usando funciones de render en src/ui/.

Filtros en vivo por:

Texto (nombre o descripción),

Región,

Dificultad.

Contadores de resultados que informan cuántas experiencias coinciden con los filtros actuales.

Mensajes claros cuando no hay coincidencias, con estados vacíos visibles en el layout.

Reutilización de la misma infraestructura de filtros gracias al helper compartido setupListFilters.

Clima por ciudad
Integración con la API de OpenWeatherMap para mostrar el clima actual según la ciudad de cada caminata.

Estado de “Cargando clima…” mientras se realiza la petición.

Mensaje legible cuando el clima no está disponible o ocurre un error (por ejemplo, falta de API key o fallo de red).

Las tarjetas de caminatas incluyen un chip de clima que resume temperatura y descripción de forma compacta.

Mapa interactivo
Mapa estilizado de Argentina (basado en SVG) con regiones definidas en datos.

Markers para caminatas y actividades, posicionados en función de la región.

Toggles para mostrar/ocultar caminatas y actividades de forma independiente.

Tooltips que muestran información clave de cada experiencia (nombre, tipo, región, dificultad) y un enlace a la página de detalle.

Lista textual accesible que refleja las experiencias visibles en el mapa, pensada para lectores de pantalla o usuarios que prefieran una vista en lista.

Carrito
Posibilidad de agregar caminatas y actividades al carrito desde las cards y/o páginas de detalle.

Edición de cantidades, eliminación de ítems individuales y opción para vaciar el carrito completo.

Cálculo automático de subtotales y total general basado en los precios de las experiencias.

Estado persistido en localStorage utilizando helpers de storage robusto para tolerar datos corruptos.

Toasts de feedback que informan sobre acciones importantes (por ejemplo, al eliminar un ítem o vaciar el carrito).

Perfil de usuario
Formulario para guardar datos básicos del usuario (nombre, email, etc.).

Validaciones simples en el front para evitar envío de datos vacíos o inválidos.

Persistencia del perfil en localStorage a través de helpers seguros (storageUtils), evitando que datos rotos rompan la UI.

Toasts de éxito y advertencia para indicar si el perfil se guardó correctamente o si falta revisar campos.

Accesibilidad básica y UX
Enlace “skip link” para saltar directamente al contenido principal.

Foco visible consistente en enlaces, botones y elementos interactivos.

Mensajes dinámicos (resultados de filtros, toasts, chips de clima) integrados con aria-live y roles adecuados (status, alert) para mejorar la experiencia con lectores de pantalla.

Mapa con toggles accesibles y una lista textual paralela de experiencias, como alternativa al mapa visual.

Responsive
Layout adaptado para mobile, tablet y desktop, con un contenedor central y paddings fluidos.

Grillas de cards que cambian entre 1, 2 y 3 columnas según el ancho del viewport.

Ajustes específicos para:

Home (hero y CTAs),

Listados,

Páginas de detalle,

Carrito,

Perfil,

Mapa (controles, leyenda y canvas),
de forma que sigan siendo legibles y utilizables en pantallas pequeñas.

Accesibilidad y UX
Robustez y manejo de errores