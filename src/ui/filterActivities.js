/**
 * Filtra actividades por nombre/título, región y dificultad.
 * Mantiene compatibilidad con la firma filterActivities(items, "texto").
 */
export function filterActivities(items, filters) {
  const isStringFilter = typeof filters === "string" || filters === undefined;
  const searchText = isStringFilter ? filters : filters?.searchText;
  const region = isStringFilter ? undefined : filters?.region;
  const difficulty = isStringFilter ? undefined : filters?.difficulty;

  const query = (searchText || "").toLowerCase().trim();
  const regionFilter = (region || "").trim();
  const difficultyFilter = (difficulty || "").trim();

  const hasRegionFilter = Boolean(regionFilter);
  const hasDifficultyFilter = Boolean(difficultyFilter);
  const hasTextFilter = Boolean(query);

  if (!hasTextFilter && !hasRegionFilter && !hasDifficultyFilter) {
    return items.slice();
  }

  return items.filter(function (item) {
    const candidate = (item.name || item.title || "").toLowerCase();
    const matchesText = hasTextFilter ? candidate.includes(query) : true;
    const matchesRegion = hasRegionFilter ? item.region === regionFilter : true;
    const matchesDifficulty = hasDifficultyFilter ? item.difficulty === difficultyFilter : true;

    return matchesText && matchesRegion && matchesDifficulty;
  });
}
