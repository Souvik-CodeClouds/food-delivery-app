import React from 'react'
import classes from './Orderitems.module.css'
const OrderDetailItems = (props) => {
  return (
    <li className={classes.meal}>
    <div>
      <h4> Meal Name: {props.name}</h4>
      <div className={classes.description}>Amount *: {props.amount}</div>
      <div className={classes.description}>Price of Each: {props.price}</div>
    </div>
    <div className={classes.price}>Price: ${(props.price * props.amount)}</div>
  </li>
  )
}

export default OrderDetailItems