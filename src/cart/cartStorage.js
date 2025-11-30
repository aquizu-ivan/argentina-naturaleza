const CART_KEY = "naturaleza-cart";

function readCart() {
  if (typeof window === "undefined" || !window.localStorage) return [];
  try {
    const stored = window.localStorage.getItem(CART_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("No se pudo leer el carrito:", error);
    return [];
  }
}

function persistCart(items) {
  if (typeof window === "undefined" || !window.localStorage) return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function getCartItems() {
  return readCart();
}

export function addToCart(item) {
  if (!item || !item.id || !item.type) return getCartItems();
  const items = readCart();
  const existing = items.find(function (entry) {
    return entry.id === item.id && entry.type === item.type;
  });

  if (existing) {
    existing.quantity = (existing.quantity || 0) + 1;
    existing.price = item.price ?? existing.price;
    existing.name = item.name || item.title || existing.name;
    existing.region = item.region || existing.region;
    existing.province = item.province || existing.province;
    existing.location = item.location || existing.location;
    existing.difficulty = item.difficulty || existing.difficulty;
    existing.duration = item.duration || existing.duration;
    existing.style = item.style || existing.style;
  } else {
    items.push({
      ...item,
      name: item.name || item.title || item.id,
      quantity: 1
    });
  }

  persistCart(items);
  return items;
}

export function updateQuantity(id, type, newQuantity) {
  const items = readCart().filter(Boolean);
  const filtered = items.filter(function (entry) {
    if (entry.id === id && entry.type === type) {
      return newQuantity > 0;
    }
    return true;
  });

  filtered.forEach(function (entry) {
    if (entry.id === id && entry.type === type && newQuantity > 0) {
      entry.quantity = newQuantity;
    }
  });

  persistCart(filtered);
  return filtered;
}

export function removeFromCart(id, type) {
  const filtered = readCart().filter(function (entry) {
    return !(entry.id === id && entry.type === type);
  });
  persistCart(filtered);
  return filtered;
}

export function clearCart() {
  persistCart([]);
  return [];
}

export function getCartCount() {
  return readCart().reduce(function (acc, item) {
    return acc + (item.quantity || 0);
  }, 0);
}

export function getCartTotal() {
  return readCart().reduce(function (acc, item) {
    const price = Number(item.price) || 0;
    return acc + price * (item.quantity || 0);
  }, 0);
}
