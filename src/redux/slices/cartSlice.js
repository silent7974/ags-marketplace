import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage if available
const savedCart = typeof window !== "undefined"
  ? JSON.parse(localStorage.getItem("cart"))
  : null;

const initialState = savedCart || {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  totalDiscountedPrice: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 🛒 Set entire cart (used when fetching from backend)
    setCart(state, action) {
      state.items = action.payload
      state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalPrice = state.items.reduce((sum, i) => sum + i.quantity * i.price, 0);
      state.totalDiscountedPrice = state.items.reduce((sum, i) => sum + i.quantity * i.discountedPrice, 0);
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // ➕ Add new item
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find(
        i =>
          i.productId === item.productId &&
          i.color === item.color &&
          i.size === item.size
      );

      if (existing) existing.quantity += item.quantity;
      else state.items.push(item);

      state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalPrice = state.items.reduce((sum, i) => sum + i.quantity * i.price, 0);
      state.totalDiscountedPrice = state.items.reduce((sum, i) => sum + i.quantity * i.discountedPrice, 0);

      localStorage.setItem("cart", JSON.stringify(state));
    },

    // 🔁 Update quantity
    updateQuantity(state, action) {
      const { productId, color, size, quantity } = action.payload;
      const item = state.items.find(
        i => i.productId === productId && i.color === color && i.size === size
      );

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            i => !(i.productId === productId && i.color === color && i.size === size)
          );
        } else {
          item.quantity = quantity;
        }
      }

      state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalPrice = state.items.reduce((sum, i) => sum + i.quantity * i.price, 0);
      state.totalDiscountedPrice = state.items.reduce((sum, i) => sum + i.quantity * i.discountedPrice, 0);

      localStorage.setItem("cart", JSON.stringify(state));
    },

    // ❌ Remove single item (clean and explicit)
    removeItem(state, action) {
      const { productId, color, size } = action.payload;
      state.items = state.items.filter(
        i => !(i.productId === productId && i.color === color && i.size === size)
      );

      state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
      state.totalPrice = state.items.reduce((sum, i) => sum + i.quantity * i.price, 0);
      state.totalDiscountedPrice = state.items.reduce((sum, i) => sum + i.quantity * i.discountedPrice, 0);

      localStorage.setItem("cart", JSON.stringify(state));
    },

    // 🧹 Clear all items
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.totalDiscountedPrice = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const { setCart, addToCart, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;