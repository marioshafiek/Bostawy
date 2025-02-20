import { createSlice } from "@reduxjs/toolkit";
//Actions
import { fetchAllProducts } from "./actions/actGetProducts";
import { fetchProductDetails } from "./actions/actGetProductDetails";
import { addProduct } from "./actions/actAddProduct";

//Initial State For Product Slice
const initialState = {
  products: [],
  categories: [],
  selectedCategory: "all",
  sortOrder: "asc",
  loading: "idle",
  error: null,
  productDetails: null,
};

// Create Slice for Product
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling fetchAllProducts cases
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.products = action.payload;
        if (state.categories.length === 0) {
          state.categories = [...new Set(action.payload.map((p) => p.category))];
        }
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })
      // Handling fetchProductDetails cases
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })
      // Handling addProduct cases
      .addCase(addProduct.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.products = [...state.products, action.payload];
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      });
  },
});
// Export actions and reducer
export const { setCategoryFilter, setSortOrder } = productsSlice.actions;
export default productsSlice.reducer;
