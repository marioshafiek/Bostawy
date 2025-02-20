//Axios
import axios from "axios";
//Redux
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newProduct, thunkAPI) => {
    try {
      const response = await axios.post("https://fakestoreapi.com/products", newProduct);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "An error occurred while adding the product."
      );
    }
  }
);
