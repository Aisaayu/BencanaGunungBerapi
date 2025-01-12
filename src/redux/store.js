import { configureStore } from "@reduxjs/toolkit";
import korbanReducer from "./korbanSlice";

const store = configureStore({
  reducer: {
    korban: korbanReducer,
  },
});

export default store;
