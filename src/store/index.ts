import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { CartSliceStore } from "./cart-slice";
import uiSlice, { UiSliceStore } from "./ui-slice";

export type StoreType = {
  ui: UiSliceStore;
  cart: CartSliceStore;
};

const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store;
