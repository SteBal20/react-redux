import { createSlice } from "@reduxjs/toolkit";
import { CartItemType } from "../models/cart.types";

export type CartSliceStore = {
  items: CartItemType[];
  totalQuantity: number;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  } as CartSliceStore,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state: CartSliceStore, action) {
      const newItem: CartItemType = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          total: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.total += newItem.price;
      }
    },
    removeItemFromCart(state: CartSliceStore, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem!.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem!.quantity--;
        existingItem!.total -= existingItem!.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
