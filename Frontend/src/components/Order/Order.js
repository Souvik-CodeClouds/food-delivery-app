import React, { useEffect, useState } from "react";
import axios from "../../axois";
import { getItemWithExpiry } from "../../Helper/localStorageHelper";
import { Card } from "../UI/Card";
import classes from "./Order.module.css";
import { Orderitem } from "./Orderitem";

const Order = () => {
  const [order, setOrder] = useState([]);
  const fetch = async () => {
    try {
      const res = await axios.get("/Order/ViewOrder.php", {
        headers: {
          Authorization: getItemWithExpiry("token"),
        },
      });

      console.log(res.data.orders);
      setOrder(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const ordersList = order.map((or) => (
    <Orderitem
      key={or.order_id}
      id={or.order_id}
      postalCode={or.postalCode}
      address={or.address}
      date={or.time}
      price={parseInt(or.totalPrice)}
    />
    // <>
    //   <li>Order_id: {or.order_id}</li>
    //   <li>Address: {or.address}</li>
    //   <li>Postal Code:{or.postalCode}</li>
    //   <li>Date of Order: {or.time}</li>
    //   <li>Amount: ${or.totalPrice}</li>
    // </>
  ));
  return (
    <section className={classes.meals}>
      
      <Card>
      {ordersList.length===0 &&<Card>No Order Available</Card>}
        {ordersList}</Card>
    </section>
  );
};

export default Order;
