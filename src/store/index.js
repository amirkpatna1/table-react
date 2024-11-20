import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "./reducers/stocksSlice";

export const store = configureStore({
  reducer: {
    stocks: stocksReducer,
  },
});

export default store;
