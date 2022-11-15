import React, { useContext, useEffect, useReducer, useState } from "react";
import axios from "../axois";
import { getItemWithExpiry } from "../Helper/localStorageHelper";
import CartContext from "./Cart-Context";





const CartProvider = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const add = async (item) => {

    try {
      const res = await axios.post(
        "/Cart/AddToCart.php",
        { ...item },
        {
          headers: {
            Authorization: getItemWithExpiry("token"),
          },
        }
      );
     fetch()

    } catch (err) {
      console.log(err);
    }
  };
  const remove = async (id) => {
    try {
      const res = await axios.post(
        "/Cart/RemoveFromCart.php",
        { meal_id:id },
        {
          headers: {
            Authorization: getItemWithExpiry("token"),
          },
        }
      );
        fetch();
      
    } catch (err) {
      
    }
  };
  
 
  useEffect(()=>{
    if(getItemWithExpiry("isLoggedIn")){
      
    fetch();
    }
  },[]);
  
  if(!isLoading){}
  const defaultCartState = {
    items: [],
    totalAmount: 0,
    
    isLoggedIn: getItemWithExpiry("isLoggedIn"),
    token: getItemWithExpiry("token"),
    role: getItemWithExpiry('role'),
  };

  const fetch = async () => {
  
    try {
      const res = await axios.get("/Cart/ViewCart.php", {
        headers: {
          Authorization: getItemWithExpiry("token"),
        },
      });
      const meals = res.data.meals;
      console.log(res);
      let totalPrice = 0
      let mealsoutput = [];
      for (let i = 0; i < meals.length; i++) {
        var filteredMeals = {
          id: meals[i].meal_id,
          name: meals[i].meal_name,
          amount: parseInt(meals[i].amount),
          price: parseInt(meals[i].price),
        };
        totalPrice += (filteredMeals.price * filteredMeals.amount);
        mealsoutput = [...mealsoutput, filteredMeals];
      }
      return getItems(mealsoutput, totalPrice);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false)
    }
  };
 
  const cartReducer = (state, action) => {
      console.log(state);
    if (action.type == "ADD") {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItem;
      let updatedItems;
      if (existingCartItem) {
        updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItem = { ...action.item };
        updatedItems = state.items.concat(updatedItem);
      }
      return { ...state, items: updatedItems, totalAmount: updatedTotalAmount };
    }
    if (action.type === "REMOVE") {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return { ...state, items: updatedItems, totalAmount: updatedTotalAmount };
    }
    if (action.type == "CLEAR") {
      return defaultCartState;
    }
    if (action.type == "LOGIN") {
      return {
        ...state,
        role: action.role,
        token: action.tk,
        isLoggedIn: true,
      };
    }
    if (action.type == "FETCH") {
      return {
        ...state,
        items: action.items,
        totalAmount: action.totalPrice
      };
    }

    if(action.type='LOGOUT'){
      return  defaultCartState;
    }
    return defaultCartState;
  };
  
  
    const [cartState, dispatchCartAction] = useReducer(
      cartReducer,
      defaultCartState
    );
  
  const addItemToCartHandler = (item) => {
    if(getItemWithExpiry("isLoggedIn")){
      add(item);
    }
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    if(getItemWithExpiry("isLoggedIn")){
      remove(id);
    }
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const LoggingInHandler = (tk, role) => {
    fetch();
    dispatchCartAction({ type: "LOGIN", tk: tk, role: role });
  };

  const LogoutHandler=()=>{
    dispatchCartAction({ type: "LOGOUT" });
  }

  const LoadHandler = (load) => {
    dispatchCartAction({ type: "LOAD", load: load });
  };

  

  const getItems = (items, totalPrice) => {
    dispatchCartAction({ type: "FETCH", items, totalPrice });
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    isLoggedIn: cartState.isLoggedIn,
    token: cartState.token,
    role:cartState.role,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
    LoggingIn: LoggingInHandler,
    fetch: fetch,
    logout:LogoutHandler,
  };

  

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
