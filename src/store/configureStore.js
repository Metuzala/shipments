import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { shipmentsReducer } from "./shipmentsSlice";

const store = configureStore({
  reducer: shipmentsReducer,
  middleware: [thunk],
});

export default store;
