import { MAP_REGIONS } from "../data/mapRegions.js";
import { activitiesData } from "../data/activitiesData.js";
import { trailsData } from "../data/trailsData.js";

const REGION_OFFSETS = [
  { x: -3, y: -2 },
  { x: 3, y: 1 },
  { x: -2, y: 3 },
  { x: 2, y: -3 },
  { x: 0, y: 2 },
  { x: -2, y: -1 },
  { x: 2, y: 2 }
];

function buildMarkerFromTrail(trail, offset) {
  const base = MAP_REGIONS[trail.region];
  if (!base) return null;

  return {
    id: trail.id,
    type: "trail",
    title: trail.name,
    region: trail.region,
    difficulty: trail.difficulty,
    href: `/caminata-detalle.html?id=${trail.id}`,
    x: Math.max(0, Math.min(100, base.x + offset.x)),
    y: Math.max(0, Math.min(100, base.y + offset.y))
  };
}

function buildMarkerFromActivity(activity, offset) {
  const base = MAP_REGIONS[activity.region];
  if (!base) return null;

  return {
    id: activity.id,
    type: "activity",
    title: activity.name,
    region: activity.region,
    difficulty: activity.difficulty,
    href: `/actividad-detalle.html?id=${activity.id}`,
    x: Math.max(0, Math.min(100, base.x + offset.x)),
    y: Math.max(0, Math.min(100, base.y + offset.y))
  };
}

export function buildMapMarkers() {
  const markers = [];
  const regionCounts = {};

  const getOffset = (region) => {
    const count = regionCounts[region] || 0;
    regionCounts[region] = count + 1;
    const pattern = REGION_OFFSETS[count % REGION_OFFSETS.length];
    return pattern || { x: 0, y: 0 };
  };

  trailsData.forEach(function (trail) {
    const offset = getOffset(trail.region);
    const marker = buildMarkerFromTrail(trail, offset);
    if (marker) markers.push(marker);
  });

  activitiesData.forEach(function (activity) {
    const offset = getOffset(activity.region);
    const marker = buildMarkerFromActivity(activity, offset);
    if (marker) markers.push(marker);
  });

  return markers;
}

export function renderMapMarkers(containerElement, markers, { onMarkerClick } = {}) {
  if (!containerElement) return null;
  const existingLayer = containerElement.querySelector(".map__markers-layer");
  if (existingLayer) {
    existingLayer.remove();
  }

  const layer = document.createElement("div");
  layer.className = "map__markers-layer";
  containerElement.appendChild(layer);

  markers.forEach(function (marker) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `map__marker map__marker--${marker.type}`;
    button.style.left = `${marker.x}%`;
    button.style.top = `${marker.y}%`;
    button.dataset.id = marker.id;
    button.dataset.type = marker.type;
    button.setAttribute(
      "aria-label",
      `${marker.type === "trail" ? "Caminata" : "Actividad"}: ${marker.title}`
    );

    button.addEventListener("click", function (event) {
      event.stopPropagation();
      if (onMarkerClick) {
        onMarkerClick(marker, button);
      }
    });

    button.addEventListener("mouseenter", function () {
      if (onMarkerClick) {
        onMarkerClick(marker, button);
      }
    });

    layer.appendChild(button);
  });

  return layer;
}
