/**
 * Filtra una lista de elementos por nombre o t\u00edtulo (propiedad `name` o `title`),
 * sin distinguir may\u00fasculas y min\u00fasculas.
 */
export function filterTrails(items, text) {
  const query = (text || "").toLowerCase().trim();

  if (!query) {
    return items;
  }

  return items.filter(function (item) {
    const candidate = (item.name || item.title || "").toLowerCase();
    return candidate.includes(query);
  });
}
