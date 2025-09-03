import { createSlice } from "@reduxjs/toolkit";
import { productApi } from "../services/productApi";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    isLoading: false,
    isError: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    clearProducts: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Public Products
      .addMatcher(
        productApi.endpoints.getPublicProducts.matchPending,
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        productApi.endpoints.getPublicProducts.matchFulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.items = payload || [];
        }
      )
      .addMatcher(
        productApi.endpoints.getPublicProducts.matchRejected,
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      )

      // 🔹 Private Products (useGetProducts)
      .addMatcher(
        productApi.endpoints.getProducts.matchPending,
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        productApi.endpoints.getProducts.matchFulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.items = payload || [];
        }
      )
      .addMatcher(
        productApi.endpoints.getProducts.matchRejected,
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

export const { setProducts, clearProducts } = productsSlice.actions;
export default productsSlice.reducer;