import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { StoreType } from ".";
import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = (): ThunkDispatch<
  StoreType,
  void,
  Action
> => {
  return async (dispatch: any) => {
    const fetchData = async () => {
      const res = await fetch(
        "https://reactest-1a5ec-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );
      if (!res.ok) {
        throw new Error("Could not fetch cart data");
      }
      const data = await res.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

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
