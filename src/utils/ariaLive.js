const HIDDEN_STYLE =
  "position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;";

function ensureLiveRegion(id = "live-region", politeness = "polite") {
  let region = document.getElementById(id);
  if (!region) {
    region = document.createElement("div");
    region.id = id;
    region.setAttribute("role", "status");
    region.setAttribute("aria-live", politeness);
    region.setAttribute("aria-atomic", "true");
    region.style.cssText = HIDDEN_STYLE;
    document.body.appendChild(region);
  }
  return region;
}

function announce(message) {
  const region = ensureLiveRegion("cart-live-region", "polite");
  region.textContent = message;
}

export function announceCartAddition(message) {
  announce(message);
}

export function announceCartUpdate(message) {
  announce(message);
}
