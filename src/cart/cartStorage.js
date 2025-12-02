import { safeLoadJSON, safeSaveJSON } from "../utils/storageUtils.js";

const CART_KEY = "naturaleza-cart";

const DEFAULT_CART = {
  items: []
};

function isValidCart(data) {
  if (!data || typeof data !== "object") return false;
  if (!Array.isArray(data.items)) return false;
  return true;
}

function loadCart() {
  const cart = safeLoadJSON(CART_KEY, DEFAULT_CART, isValidCart);
  return cart.items || [];
}

function saveCart(items) {
  safeSaveJSON(CART_KEY, { items });
}

export function getCartItems() {
  return loadCart();
}

export function addToCart(item) {
  if (!item || !item.id || !item.type) return getCartItems();
  const items = loadCart();
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

  saveCart(items);
  return items;
}

export function updateQuantity(id, type, newQuantity) {
  const items = loadCart().filter(Boolean);
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

  saveCart(filtered);
  return filtered;
}

export function removeFromCart(id, type) {
  const filtered = loadCart().filter(function (entry) {
    return !(entry.id === id && entry.type === type);
  });
  saveCart(filtered);
  return filtered;
}

export function clearCart() {
  saveCart([]);
  return [];
}

export function getCartCount() {
  return loadCart().reduce(function (acc, item) {
    return acc + (item.quantity || 0);
  }, 0);
}

export function getCartTotal() {
  return loadCart().reduce(function (acc, item) {
    const price = Number(item.price) || 0;
    return acc + price * (item.quantity || 0);
  }, 0);
}
