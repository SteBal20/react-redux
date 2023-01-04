import { createSlice } from "@reduxjs/toolkit";
import { NotificationType } from "../models/notification.types";

export type UiSliceStore = {
  cartIsVisible: boolean;
  notification: NotificationType | null;
};

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartIsVisible: false,
    notification: null,
  } as UiSliceStore,
  reducers: {
    toggle(state: UiSliceStore) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
