export function createActivityCard(activity) {
  const card = document.createElement("article");
  card.className = "trail-card";

  const title = document.createElement("h3");
  title.textContent = activity.name;

  const location = document.createElement("p");
  location.textContent = activity.location;

  const details = document.createElement("p");
  details.textContent = `${activity.style} • Duración: ${activity.duration}`;

  const description = document.createElement("p");
  description.textContent = activity.description;

  card.append(title, location, details, description);
  return card;
}
