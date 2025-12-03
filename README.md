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
Funcionalidades principales
Accesibilidad y UX
Robustez y manejo de errores