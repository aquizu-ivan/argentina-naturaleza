import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: '/argentina-naturaleza/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        caminatas: resolve(rootDir, 'caminatas.html'),
        activities: resolve(rootDir, 'activities.html'),
        mapa: resolve(rootDir, 'mapa.html'),
        caminataDetalle: resolve(rootDir, 'caminata-detalle.html'),
        actividadDetalle: resolve(rootDir, 'actividad-detalle.html'),
        carrito: resolve(rootDir, 'carrito.html'),
        perfil: resolve(rootDir, 'perfil.html'),
      },
    },
  },
});
