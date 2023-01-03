import { createSlice } from "@reduxjs/toolkit";

export type UiSliceStore = {
  cartIsVisible: boolean;
};

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false } as UiSliceStore,
  reducers: {
    toggle(state: UiSliceStore) {
      state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
