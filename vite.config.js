import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        caminatas: 'caminatas.html',
        activities: 'activities.html',
        caminataDetalle: 'caminata-detalle.html',
        actividadDetalle: 'actividad-detalle.html',
        carrito: 'carrito.html',
        perfil: 'perfil.html',
      },
    },
  },
});
