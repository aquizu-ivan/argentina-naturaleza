export function filterTrails(trailsData, text) {
  const query = text.toLowerCase().trim();

  if (!query) {
    return trailsData;
  }

  return trailsData.filter(function (trail) {
    return trail.name.toLowerCase().includes(query);
  });
}
