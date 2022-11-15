import classes from "./Cart.module.css";

import React, { useContext, useState } from "react";
import Model from "../UI/Modal";
import CartContext from "../../Store/Cart-Context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { useNavigate } from "react-router-dom";
import { getItemWithExpiry } from "../../Helper/localStorageHelper";
import axios from "../../axois";

const Cart = (props) => {
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  const TotalAmount = `$ ${parseInt(cartCtx.totalAmount).toFixed(2)}`;
  const [checkout,setCheckout]=useState(false);
  

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item,amount:1});
  };

  const submitOrderHandler =async (userData)=> {
    const orderData={...userData,items:cartCtx.items,totalPrice:cartCtx.totalAmount};
    try {
      const res = await axios.post(
        "/Order/AddOrder.php",
        orderData,
        {
          headers: {
            Authorization: getItemWithExpiry("token"),
          },
        }
      );
      const status= res.data.status;
      if(res.data.status==1){
          props.onHideCart();
          cartCtx.clearCart();
          navigate("/");

      }

      
    } catch (error) {
      
    }
   
  };
  
  const handleOrderBtn =()=>{
    if(getItemWithExpiry("isLoggedIn")){
    setCheckout(true);
    }else{
      navigate("/login")
    }
  }
  const cartitems = cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null,item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
      
    />
  ));
  
  const hasItems = cartCtx.items.length > 0;
  return (
    <Model>
      <ul className={classes["cart-items"]}>{cartitems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{TotalAmount}</span>
      </div>
       { checkout && <Checkout onConfirm={ submitOrderHandler} onClick={props.onHideCart}/>}
       {!checkout &&
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={handleOrderBtn}>Order</button>}
      </div>}
    </Model>
  );
};

export default Cart;
