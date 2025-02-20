import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const payload = {
        username: credentials.username,
        password: credentials.password,
      };
      const loginResponse = await axios.post(
        "https://fakestoreapi.com/auth/login",
        payload,
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      const token = loginResponse.data.token;
      
      // API doesn't return user details, so fetch all users
      const usersResponse = await axios.get("https://fakestoreapi.com/users");
      const user = usersResponse.data.find(u => u.username === payload.username);
      
      if (!user) {
        return rejectWithValue("User not found");
      }
      
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);
