import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useAppDispatch } from "./hooks/hooks";
import { StoreType } from "./store";
import { sendCartData } from "./store/cart-slice";

let isInitial = true;

function App() {
  const dispatch = useAppDispatch();
  const showCart = useSelector(
    (state: StoreType) => state.ui.cartIsVisible
  );
  const cart = useSelector((state: StoreType) => state.cart);
  const notification = useSelector(
    (state: StoreType) => state.ui.notification
  );

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "pending",
  //         title: "Sending...",
  //         message: "Sending cart data!",
  //       })
  //     );
  //     const res = await fetch(
  //       "https://reactest-1a5ec-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
  //       { method: "PUT", body: JSON.stringify(cart) }
  //     );
  //     if (!res.ok) {
  //       throw new Error("Sending cart data failed!");
  //     }
  //     const data = await res.json();

  //     dispatch(
  //       uiActions.showNotification({
  //         status: "success",
  //         title: "Success!",
  //         message: "Sent cart data succesfully!",
  //       })
  //     );
  //   };

  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch((err) => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "error",
  //         title: "Error!",
  //         message: "Sending cart data failed!",
  //       })
  //     );
  //   });
  // }, [cart, dispatch]);

  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
