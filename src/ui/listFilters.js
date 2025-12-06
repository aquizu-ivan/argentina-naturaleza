export function setupListFilters({
  searchInput,
  regionSelect,
  difficultySelect,
  resultsInfoElement,
  getAllItems,
  applyFilterLogic,
  onResultsChange,
  labels
}) {
  const getItems = typeof getAllItems === "function" ? getAllItems : function () { return []; };
  const runFilter = typeof applyFilterLogic === "function" ? applyFilterLogic : function (items) { return items; };
  const handleResultsChange = typeof onResultsChange === "function" ? onResultsChange : function () {};

  const messages = {
    plural: labels?.plural || "resultados"
  };

  function update() {
    const filters = {
      searchText: searchInput ? searchInput.value : "",
      region: regionSelect ? regionSelect.value : "",
      difficulty: difficultySelect ? difficultySelect.value : ""
    };

    const items = getItems() || [];
    const filteredItems = runFilter(items, filters) || [];

    if (resultsInfoElement) {
      if (filteredItems.length > 0) {
        resultsInfoElement.textContent = `Se encontraron ${filteredItems.length} ${messages.plural}.`;
      } else {
        resultsInfoElement.textContent = `No hay ${messages.plural} para esta combinación de filtros. Ajustá los filtros o volvé a la lista completa.`;
      }
    }

    handleResultsChange(filteredItems);
    return filteredItems;
  }

  if (searchInput) {
    searchInput.addEventListener("input", update);
  }

  if (regionSelect) {
    regionSelect.addEventListener("change", update);
  }

  if (difficultySelect) {
    difficultySelect.addEventListener("change", update);
  }

  update();

  return { update };
}
