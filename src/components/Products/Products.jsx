import React, { useContext, useState } from "react";
import style from "./Products.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProduct from "./../../Hooks/useProduct";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Products() {
  let { data, isError, error, isLoading } = useProduct();
  let { addProductToCart, setcartitemscount, cartitemscount } =
    useContext(CartContext);
  const [currentId, setcurrentId] = useState();
  const [Loading, setLoading] = useState(false);
  let { addToWishlist, currentwishId, setcurrenwishtId } = useContext(WishlistContext);
  
  function addToWish(productId) {
    addToWishlist(productId);
    setcurrenwishtId((prevWishIds) => [...prevWishIds, productId]);
    toast.success("Added to Wishlist Successfully");
  }

  if (isError) {
    return <h2>{error}</h2>;
  }
  if (isLoading) {
    return (
      <>
        <div className="row">
          <span className="loader"></span>
        </div>
      </>
    );
  }

  async function addToCart(id) {
    setLoading(true);
    setcurrentId(id);
    let response = await addProductToCart(id);

    if (response.data.status == "success") {
      setLoading(false);
      toast.success(response.data.message);
      setcartitemscount(cartitemscount + 1);
    } else {
      setLoading(false);
      toast.error(response.data.message);
    }
  }

  return (
    <>
      <div className="row mx-2">
        {data.map((product) => (
          <div key={product.id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6 ">
            <div className="product my-3 p-2 duration-500">
              <Link
                to={`/productdetails/${product.category.name}/${product.id}`}
              >
                <img src={product.imageCover} className="w-full" alt="" />
                <h3 className="text-emerald-600">{product.category.name}</h3>
                <h3 className="font-semibold mb-1">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h3>
                <div className="flex justify-between mb-1">
                  <span>{product.price} EGP</span>
                  <span>
                    <i className="fas fa-star text-yellow-300"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <div
                onClick={() => {
                  addToWish(product.id);
                }}
                className={currentwishId.includes(product.id) ? "flex justify-end cursor-pointer text-red-600 pointer-events-none" : "flex justify-end cursor-pointer"}
              >
                <i className="fa-solid fa-heart text-2xl me-3"></i>
              </div>
              <button
                onClick={() => addToCart(product.id)}
                className="btn bg-emerald-600 text-white px-4 py-2 rounded-lg w-full"
              >
                {Loading && currentId == product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <div>
                    <i className="fa-solid fa-plus"></i> Add To Cart
                  </div>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
