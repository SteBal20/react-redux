import { useSelector } from "react-redux";
import { StoreType } from "../../store";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = () => {
  const cartItems = useSelector(
    (state: StoreType) => state.cart.items
  );
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;

{
  /* <CartItem
item={{
  title: "Test Item",
  quantity: 3,
  total: 18,
  price: 6,
}}
/> */
}
