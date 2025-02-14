import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {
  const [currentwishId, setcurrenwishtId] = useState(() => {
    return JSON.parse(localStorage.getItem("myIds")) || [];
  });
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const [wishlistnumber, setwishlistnumber] = useState(0);

  function getWishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => {
        setwishlistnumber(res.data.count);
        return res;
      })
      .catch((err) => err);
  }

  function addToWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function removeFromWishlist(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function removeidwish(productId) {
    setcurrenwishtId((prevWishIds) =>
      prevWishIds.filter((id) => id !== productId)
    );
  }


  useEffect(() => {
    localStorage.setItem("myIds", JSON.stringify(currentwishId));
  }, [currentwishId]);


  return (
    <WishlistContext.Provider
      value={{
        getWishlist,
        addToWishlist,
        removeFromWishlist,
        currentwishId,
        setcurrenwishtId,
        removeidwish
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
