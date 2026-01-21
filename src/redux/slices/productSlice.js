import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCurrentProduct: (state, action) => {
      state.current = action.payload;
    },

    updateCurrentField: (state, action) => {
      const { field, value } = action.payload;
      if (state.current) {
        state.current[field] = value;
      }
    },

    setCurrentVariants: (state, action) => {
      if (state.current) {
        state.current.variants = action.payload;
      }
    },

    setCurrentVariantColumns: (state, action) => {
      if (state.current) {
        state.current.variantColumns = action.payload;
      }
    },

    setCurrentImages: (state, action) => {
      if (state.current) {
        state.current.images = action.payload;
      }
    },

    setCurrentAdVideo(state, action) {
      if (state.current) {
        state.current.adVideo = action.payload;
      }
    },

    removeCurrentAdVideo(state) {
      if (state.current) {
        state.current.adVideo = null;
      }
    },

    resetCurrentProduct: (state) => {
      state.current = null;
    },
  },
});

export const {
  setCurrentProduct,
  updateCurrentField,
  setCurrentVariants,
  setCurrentVariantColumns,
  setCurrentImages,
  setCurrentAdVideo,
  removeCurrentAdVideo,
  resetCurrentProduct,
} = productSlice.actions;

export default productSlice.reducer;