import { Action, createSlice, ThunkDispatch } from "@reduxjs/toolkit";
import { CartItemType } from "../models/cart.types";
import { uiActions } from "./ui-slice";
import { StoreType } from "./index";

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

export const sendCartData = (
  cart: any
): ThunkDispatch<StoreType, void, Action> => {
  return async (dispatch: any) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const res = await fetch(
        "https://reactest-1a5ec-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );
      if (!res.ok) {
        throw new Error("Sending cart data failed!");
      }
      // const data = await res.json();
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data succesfully!",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
