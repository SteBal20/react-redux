import {
  Action,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import cartSlice, { CartSliceStore } from "./cart-slice";
import uiSlice, { UiSliceStore } from "./ui-slice";

export type StoreType = {
  ui: UiSliceStore;
  cart: CartSliceStore;
};

const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
