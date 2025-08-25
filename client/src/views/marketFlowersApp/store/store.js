import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./carteSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
