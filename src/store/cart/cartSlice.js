import { createSlice } from "@reduxjs/toolkit";
import actGetProductsById from "./actions/actGetProductsById";

const initialState = {
  items: {}, // --> { productId: quantity }
  productFullInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload;
      if (state.items[productId]) {
        state.items[productId] += 1;
      } else {
        state.items[productId] = 1;
      }
    },
    removeOneFromCart: (state, action) => {
      const productId = action.payload;
      if (state.items[productId]) {
        if (state.items[productId] > 1) {
          state.items[productId] -= 1;
        } else {
          delete state.items[productId];
        }
      }
    },
    deleteFromCart: (state, action) => {
      const productId = action.payload;
      if (state.items[productId]) {
        delete state.items[productId];
      }
    },
    deleteAllFromCart: (state) => {
      state.items = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsById.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsById.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productFullInfo = action.payload;
    });
    builder.addCase(actGetProductsById.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload
    });
  },
});

export const { addToCart, removeOneFromCart, deleteFromCart, deleteAllFromCart } = cartSlice.actions;
export default cartSlice.reducer;
