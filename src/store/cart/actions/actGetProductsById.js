import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const actGetProductsById = createAsyncThunk(
  "cart/actGetProductsById",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { items } = state.cart;
    const itemsId = Object.keys(items);
    try {
      // Fetch all products by their IDs
      const productRequests = itemsId.map((id) =>
        axios.get(`https://fakestoreapi.com/products/${id}`)
      );
      const responses = await Promise.all(productRequests);
      const products = responses.map((response) => response.data);
      return products;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "An error occurred"
      );
    }
  }
);

export default actGetProductsById;
