import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
//Slices
import productsReducer from "./products/productsSlice"; 
import cartSlice from "./cart/cartSlice";
import authSlice from "./auth/authSlice";

// Combine reducers
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartSlice,
  auth: authSlice
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage, 
  whitelist: ['products',"cart", "auth"], //Added products to the whitelist so they appear in the shop when a new product is added.
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };