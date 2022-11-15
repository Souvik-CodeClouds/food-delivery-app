import React, { useContext } from "react";
import { getItemWithExpiry } from "../../../Helper/localStorageHelper";
import CartContext from "../../../Store/Cart-Context";
import MealItemForm from "./MealItemForm";
import classes from "./MealItems.module.css";


const MealIteams = (props) => {
    const price = `$ ${parseInt(props.price).toFixed(2)}`;
    const cartCtx = useContext(CartContext);
    const addToCartHandler=amount=>{
      cartCtx.addItem({
        id:props.id,
        name:props.name,
        amount:amount,
        price: props.price
      })

    }
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.des}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} OnAddToCart={addToCartHandler}/>
      </div>
    </li>
  );
};

export default MealIteams;
