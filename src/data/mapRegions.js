// Coordenadas relativas (0 a 100) para posicionar markers sobre el mapa SVG.
// Se alinean con las regiones presentes en trailsData y activitiesData.
export const MAP_REGIONS = {
  Patagonia: { x: 56, y: 78 },
  Noroeste: { x: 30, y: 22 },
  "Sierras Centrales": { x: 46, y: 54 },
  Centro: { x: 54, y: 46 },
  Litoral: { x: 64, y: 34 }
};

// Estas coordenadas se interpretan como porcentaje del ancho y alto del SVG/canvas.
// En el Bloque D se usarán para derivar posiciones de markers de caminatas y actividades.
