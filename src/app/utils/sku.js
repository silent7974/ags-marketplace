// utils/sku.js

function cleanString(str = '', maxLength = 3) {
  return String(str || '')
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .slice(0, maxLength);
}

/**
 * Generate SKU for base product or variant
 * @param {string} productName - Product name
 * @param {Object} variants - Variant values (color, size, etc.)
 * @param {number|string} quantity - Quantity of this product/variant
 * @returns {string} SKU string
 */
export function generateSKU(productName = '', variants = {}, quantity = 0) {
  const p = cleanString(productName, 3);              // first 3 letters of product
  const color = cleanString(variants.color, 3);       // first 3 letters of color
  const size = cleanString(variants.size, 1);         // first letter of size
  const qty = String(quantity || 0).padStart(2, '0'); // always at least 2 digits

  return `${p}-${color}-${size}-${qty}`;
}