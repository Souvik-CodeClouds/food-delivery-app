import React, { useContext, useEffect,useState } from "react";
import CartContext from "../../Store/Cart-Context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderButton.module.css";

export const HeaderButton = (props) => {
  const cartctx = useContext(CartContext);
  const [btnIsHighLighted,setBtnIsHighLighted]=useState(false);
  const noOfCartItem = cartctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const {items} = cartctx;
const btnClasses=`${classes.button} ${btnIsHighLighted ? classes.bump: ''} `;

useEffect(()=>{
  if(cartctx.items.length===0){
    return;
  }
  setBtnIsHighLighted(true);

  const timer = setTimeout(()=>{
    setBtnIsHighLighted(false);
  },300);
  

  return ()=>{
    clearTimeout(timer);
  }
},[items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfCartItem}</span>
    </button>
  );
};
