# Naturaleza Argentina 🌿

Sitio multipágina sobre **caminatas y actividades al aire libre en Argentina**, pensado como proyecto de porfolio front-end.  
Incluye home con hero fotográfico, listados filtrables, páginas de detalle, carrito de actividades y un perfil de usuario guardado en `localStorage`.

## 🚀 Demo

- **Producción:** https://TU-SITIO.netlify.app  
- **Repositorio:** https://github.com/aquizu-ivan/argentina-naturaleza

*(Reemplazar la URL de Netlify con la tuya.)*

---

## 🌱 Visión general

Naturaleza Argentina propone un flujo simple pero completo:

1. El usuario explora **caminatas** y **actividades** con buscadores en vivo.
2. Abre **páginas de detalle** con descripciones extendidas, beneficios y datos clave.
3. Añade experiencias a un **carrito**.
4. Completa sus **datos de perfil** para agilizar futuras reservas (demo sin backend).
5. Vuelve a explorar con su nombre visible en el header.

Todo está desarrollado con **Vite + JavaScript vanilla**, sin frameworks, para mostrar dominio de HTML, CSS y JS “a mano”.

---

## ✨ Funcionalidades principales

- **UI multipágina**
  - `index.html` (Home)
  - `caminatas.html` (lista de caminatas)
  - `activities.html` (lista de actividades)
  - `caminata-detalle.html` / `actividad-detalle.html`
  - `carrito.html`
  - `perfil.html`

- **Hero fotográfico**
  - Imagen real en `public/assets/photos/home-hero.jpg`.
  - Overlay y tarjeta con título, subtítulo, “eyebrow” y chips temáticos.
  - Dos botones primarios iguales: **Ver caminatas** / **Ver actividades**.

- **Listados con buscador en vivo**
  - Filtrado por texto sobre el nombre de la caminata/actividad.
  - Estado vacío (“no encontramos resultados”) cuando el filtro no matchea nada.
  - Cards con:
    - Dificultad, duración y región (con iconos).
    - Precio por persona.
    - CTA **Añadir al carrito** + link a detalle.

- **Páginas de detalle**
  - Foto ilustrativa de la caminata/actividad.
  - Descripción extendida.
  - Bloque de **“Información clave”** (dificultad, duración, región).
  - Lista de beneficios (“Qué vas a vivir”, “Beneficios para tu cuerpo y mente”).
  - Botón **Añadir al carrito** y **Volver** a la lista correspondiente.
  - Manejo de errores: si el `id` no existe, se muestra mensaje de “no encontrado” y CTA para volver.

- **Carrito de actividades y caminatas**
  - Añadir desde cards y desde detalle.
  - Ajustar cantidades (+/−, input numérico).
  - Eliminar ítems y vaciar carrito.
  - Cálculo de subtotal por ítem y total general.
  - Badges con contador en el header (icono 🛒).

- **Perfil de usuario (demo)**
  - Formulario: nombre, email, localidad/provincia, teléfono y nota.
  - Datos guardados en `localStorage`.
  - Header dinámico: muestra “Hola, {nombre}” o “Mi perfil” según haya datos.
  - En el carrito se muestran los “Datos del viajero” si el perfil está completo.
  - Botón **Cerrar sesión**: limpia el perfil y devuelve al home.

- **Carrito + perfil con estado persistente**
  - Implementados con `localStorage`:
    - `cartStorage.js`
    - `profileStorage.js`
  - El sitio recuerda carrito y datos de usuario entre visitas.

- **Diseño y accesibilidad**
  - Fondo de naturaleza con canopy, degradados verdes y textura de papel.
  - Navbar y footer en gradiente oscuro coherente con el resto del diseño.
  - Hover/focus claros en botones y cards.
  - `prefers-color-scheme: dark` para un modo “bosque nocturno” automático.
  - `alt` descriptivos en imágenes de detalle.
  - Breadcrumbs con `aria-label="Breadcrumb"` en las páginas de detalle.
  - Uso de `sr-only` para etiquetas de inputs de búsqueda.

- **SEO básico**
  - Títulos y `meta description` específicos por página.
  - `og:title`, `og:description` y `og:image` configurados (hero general).

---

## 🧱 Tecnologías

- **Vite** (vanilla)
- **JavaScript ES6+**
- **HTML5**
- **CSS3** (layout, variables, animaciones y media queries)
- `localStorage` para carrito y perfil

---

## 📁 Estructura del proyecto (resumen)

```txt
.
├─ index.html
├─ caminatas.html
├─ activities.html
├─ caminata-detalle.html
├─ actividad-detalle.html
├─ carrito.html
├─ perfil.html
├─ public/
│  ├─ assets/
│  │  ├─ backgrounds/
│  │  ├─ textures/
│  │  ├─ photos/
│  │  │  ├─ trails/        # Fotos sugeridas para caminatas
│  │  │  └─ activities/    # Fotos sugeridas para actividades
│  │  └─ og/
│  └─ favicon.ico
└─ src/
   ├─ main.js              # Home
   ├─ trails.js            # Lista de caminatas
   ├─ activities.js        # Lista de actividades
   ├─ trailDetail.js       # Detalle caminata
   ├─ activityDetail.js    # Detalle actividad
   ├─ cart.js              # Carrito
   ├─ profile.js           # Perfil
   ├─ styles.css
   ├─ data/
   │  ├─ trailsData.js
   │  └─ activitiesData.js
   ├─ ui/
   │  ├─ header.js
   │  ├─ renderApp.js
   │  ├─ renderTrailsPage.js
   │  ├─ renderActivitiesPage.js
   │  ├─ renderTrailDetailPage.js
   │  ├─ renderActivityDetailPage.js
   │  ├─ renderCartPage.js
   │  ├─ renderProfilePage.js
   │  ├─ createTrailCard.js
   │  └─ createActivityCard.js
   ├─ cart/
   │  ├─ cartStorage.js
   │  └─ cartBadge.js
   └─ profile/
      └─ profileStorage.js

      Cómo correr el proyecto
# 1. Clonar el repositorio
git clone https://github.com/aquizu-ivan/argentina-naturaleza.git
cd argentina-naturaleza

# 2. Instalar dependencias
npm install

# 3. Entorno de desarrollo
npm run dev

# 4. Build de producción
npm run build

Mejoras futuras

Agregar filtro por región/dificultad además del buscador de texto.

Añadir paginación o carga progresiva para listas largas.

Integrar un backend real para:

Autenticación.

Reservas de actividades.

Historial de compras.

Sistema de reseñas y valoraciones de caminatas/actividades.

Internacionalización (ES / EN).

Autor

Desarrollado por Iván Aquizu como proyecto de porfolio front-end.
Centrado en diseño, experiencia de usuario y manejo de estado en el cliente con JavaScript vanilla.
