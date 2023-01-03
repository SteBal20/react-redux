import { useDispatch } from "react-redux";
import { ProductType } from "../../models/product.types";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { cartActions } from "../../store/cart-slice";
import React from "react";

const ProductItem: React.FC<ProductType> = (props) => {
  const dispatch = useDispatch();
  const { id, title, price, description } = props;

  const addToCartHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    dispatch(cartActions.addItemToCart({ id, title, price }));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
