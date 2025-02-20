import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const payload = {
        username: userData.username,
        email: userData.email,
        password: userData.password, 
      };

      const signupResponse = await axios.post(
        "https://fakestoreapi.com/users",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      // The API returns only an id
      const { id } = signupResponse.data;

      // Combine the id with the original user data to form a complete user object
      const completeUser = { id, ...userData };
      return { user: completeUser };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Signup failed");
    }
  }
);
