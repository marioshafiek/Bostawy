//Axios
import axios from "axios";
//Redux
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductDetails = createAsyncThunk(
    "products/fetchProductDetails",
    async (id, thunkAPI) => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data || error.message || "An error occurred"
        );
      }
    }
  );
