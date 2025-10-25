export default function formatPrice(value) {
  if (!value && value !== 0) return "0";
  
  // Convert to number if string
  const num = Number(value);
  if (isNaN(num)) return value;

  // Format with commas, e.g., 125000 → 125,000
  return num.toLocaleString("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}