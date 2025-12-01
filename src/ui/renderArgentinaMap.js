export function renderArgentinaMap(canvasElement) {
  if (!canvasElement) return null;

  canvasElement.innerHTML = `
    <svg
      class="map__svg"
      viewBox="0 0 220 520"
      role="img"
      aria-label="Mapa estilizado de Argentina"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="mapRelief" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0d4232" />
          <stop offset="60%" stop-color="#0a2f24" />
          <stop offset="100%" stop-color="#0a261d" />
        </linearGradient>
        <linearGradient id="mapHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.12)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      <g class="map__base">
        <path
          class="map__base-shadow"
          d="M120 14 L156 44 L172 92 L166 132 L182 174 L168 224 L178 270 L168 322 L178 368 L158 418 L148 464 L124 508 L104 468 L92 422 L82 366 L94 316 L86 270 L94 224 L80 178 L90 128 L78 84 L98 40 Z"
        />
        <path
          class="map__base-shape"
          d="M118 22 L148 48 L162 90 L156 130 L170 170 L158 216 L168 262 L158 310 L166 350 L150 398 L140 442 L122 486 L106 446 L94 402 L88 356 L96 308 L90 262 L98 216 L86 170 L96 122 L86 78 L104 40 Z"
          fill="url(#mapRelief)"
        />
        <path
          class="map__base-highlight"
          d="M120 36 L142 58 L152 92 L148 122 L158 154 L150 190 L158 222 L150 260 L156 292 L144 330 L136 362 L124 392 L114 360 L108 330 L112 300 L106 260 L112 222 L104 188 L112 154 L106 124 L112 92 L108 62 Z"
          fill="url(#mapHighlight)"
        />
      </g>

      <g class="map__regions">
        <path
          class="map-region map-region--noroeste"
          d="M92 58 L122 82 L118 134 L90 164 L72 132 L82 96 Z"
        />
        <path
          class="map-region map-region--litoral"
          d="M132 62 L168 86 L172 150 L148 200 L126 170 L130 128 Z"
        />
        <path
          class="map-region map-region--centro"
          d="M114 168 L144 200 L138 250 L114 278 L98 246 L106 210 Z"
        />
        <path
          class="map-region map-region--sierras"
          d="M82 178 L112 210 L104 248 L78 234 L72 196 Z"
        />
        <path
          class="map-region map-region--patagonia"
          d="M94 274 L132 294 L144 352 L132 414 L120 452 L104 422 L92 368 L82 314 Z"
        />
      </g>
    </svg>
  `;

  const svgElement = canvasElement.querySelector(".map__svg");
  const regionsLayer = canvasElement.querySelector(".map__regions");
  const baseLayer = canvasElement.querySelector(".map__base");

  return {
    svgElement,
    regionsLayer,
    baseLayer
  };
}
