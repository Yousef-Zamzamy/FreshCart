import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  const [cartId, setcartId] = useState(0)
  const [cartitemscount, setcartitemscount] = useState(0)

  function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        setcartId(res.data.data._id);
        setcartitemscount(res.data.numOfCartItems);
        return res
      })
      .catch((err) => err);
  }

  function removeProductFromCart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function updateProductCount(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function removeAllProducts() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function checkout(cardId, url, formData) {
    return axios
      .post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}` , {
        shippingAddress : formData
      }, {headers})
      .then((res) => res)
      .catch((err) => err);
  }


  useEffect(() => { getUserCart() } , [])

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getUserCart,
        removeProductFromCart,
        updateProductCount,
        removeAllProducts,
        checkout,
        cartId,
        cartitemscount,
        setcartitemscount,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
