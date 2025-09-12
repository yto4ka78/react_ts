import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./carteSlice";
import dataStorageReducer from "./dataSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    dataStorage: dataStorageReducer,
  },
});
