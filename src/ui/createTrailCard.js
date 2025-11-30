export function createTrailCard(trail) {
  const link = document.createElement("a");
  link.className = "card-link";
  link.href = `/caminata-detalle.html?id=${encodeURIComponent(trail.id)}`;

  const card = document.createElement("article");
  card.className = "trail-card fade-in";

  const title = document.createElement("h3");
  title.textContent = trail.name;

  const location = document.createElement("p");
  location.textContent = `${trail.province} \u00b7 ${trail.region}`;

  const details = document.createElement("p");
  details.textContent = `Dificultad: ${trail.difficulty} \u2022 Duraci\u00f3n: ${trail.duration}`;

  const description = document.createElement("p");
  description.textContent = trail.description;

  card.append(title, location, details, description);
  link.append(card);
  return link;
}
