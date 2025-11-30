export function createActivityCard(activity) {
  const link = document.createElement("a");
  link.className = "card-link";
  link.href = `/actividad-detalle.html?id=${encodeURIComponent(activity.id)}`;

  const card = document.createElement("article");
  card.className = "trail-card fade-in";

  const title = document.createElement("h3");
  title.textContent = activity.name;

  const location = document.createElement("p");
  location.textContent = activity.location;

  const details = document.createElement("p");
  details.textContent = `${activity.style} \u00b7 Duraci\u00f3n: ${activity.duration}`;

  const description = document.createElement("p");
  description.textContent = activity.description;

  card.append(title, location, details, description);
  link.append(card);
  return link;
}
