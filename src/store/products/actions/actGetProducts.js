//Axios
import axios from "axios";
//Redux
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async ({ selectedCategory = "all", sortOrder = "asc" }, thunkAPI) => {
    try {
      let url;
      if (selectedCategory && selectedCategory !== "all") {
        url = `https://fakestoreapi.com/products/category/${selectedCategory}?sort=${sortOrder}`;
      } else {
        url = `https://fakestoreapi.com/products?sort=${sortOrder}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "An error occurred"
      );
    }
  }
);
