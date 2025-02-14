import React, { useContext, useEffect, useState } from "react";
import style from "./Allorders.module.css";
import axios from "axios";

import { CartContext } from "../../Context/CartContext";
import { OtherContext } from "../../Context/OtherContext";


export default function Allorders() {
  const [allOrders, setallOrders] = useState(null);
  let { getAllOrders } = useContext(OtherContext);
  let { checkout , cartId } = useContext(CartContext);

  async function getorders() {
    let response = await getAllOrders();
    if (response.statusText == "OK") {
      console.log(response.data.data);
      setallOrders(response.data.data);
    }
  }

  useEffect(() => {
    getorders(  );
  }, []);
  return (
    <>
      {allOrders?.map((order) => <h1 key={order._id}>{order.user.email}</h1>)}
    </>
  );
}
