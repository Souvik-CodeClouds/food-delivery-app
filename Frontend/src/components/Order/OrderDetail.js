import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axois";
import { getItemWithExpiry } from "../../Helper/localStorageHelper";
import OrderDetailItems from "./OrderDetailItems";
import classes from "./Order.module.css";
import { Card } from "../UI/Card";

const OrderDetail = (props) => {
  const { orderId, priceI } = useParams();
  const [orderitems, setOrderItems] = useState([]);
  const fetchDetails = async () => {
    try {
      const res = await axios.get(
        `/Order/ViewOrderItems.php?order_id=${orderId}`,
        {
          headers: {
            Authorization: getItemWithExpiry("token"),
          },
        }
      );
      setOrderItems(res.data.orderItems);
      console.log(res.data.orderItems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [orderId]);

  const ordersItemList = orderitems.map((or) => (
    <OrderDetailItems
      key={or.orderitem_id}
      amount={parseInt(or.amount)}
      name={or.name}
      price={parseInt(or.price)}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>{ordersItemList}
      <li className={classes.meal}>
      <div className={classes.price}> Grant Total:</div>
      <div className={classes.price}> ${priceI}</div>
      </li>
      </Card>
    </section>
  );
};

export default OrderDetail;
