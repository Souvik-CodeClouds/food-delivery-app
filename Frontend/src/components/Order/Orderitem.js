import React from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './Orderitems.module.css'

export const Orderitem = (props) => {
    const navigate = useNavigate();
  
  return (
    <li className={classes.meal}>
      <div>
        <h4>Order id: {props.id}</h4>
        <div className={classes.description}>Delivery Adress: {props.address}</div>
        <div className={classes.description}>Postal Code: {props.postalCode}</div>
        <div className={classes.description}>Date of Order: {props.date}</div>
        <div className={classes.price}>Total Amount: ${props.price}</div>
      </div>
      <div className={classes.actions} >
      <button className={classes.submit} onClick={()=>navigate(`/orderDetails/${props.id}/${props.price}`)}>View Details</button>
      </div>
    </li>
  )
}
