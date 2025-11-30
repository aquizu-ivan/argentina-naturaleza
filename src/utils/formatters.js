const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0
});

export function formatPrice(value) {
  const numeric = Number(value) || 0;
  try {
    return priceFormatter.format(numeric);
  } catch (error) {
    return `$${numeric.toFixed(0)}`;
  }
}
