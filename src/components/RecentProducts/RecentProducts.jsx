import React, { useContext, useEffect, useState } from "react";
import style from "./RecentProducts.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useProduct from "../../Hooks/useProduct";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";

export default function RecentProducts() {
  const [Loading, setLoading] = useState(false);
  const [currentId, setcurrentId] = useState();
  
  let { data, isError, error, isLoading } = useProduct();
  let { addProductToCart, setcartitemscount, cartitemscount } =
    useContext(CartContext);
  let navigate = useNavigate();
  let { addToWishlist, currentwishId, setcurrenwishtId } = useContext(WishlistContext);

  function addToWish(productId) {
    addToWishlist(productId);
    setcurrenwishtId((prevWishIds) => [...prevWishIds, productId]);
    toast.success("Added to Wishlist Successfully");
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

  function toastError() {
    toast("Please Login First");
  }

  function detailsNavigate(name, id) {
    navigate(`/productdetails/${name}/${id}`);
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

  return (
    <>
      <div className="row mx-2">
        {data.map((product) => (
          <div key={product.id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6 ">
            <div
              className={
                localStorage.getItem("userToken")
                  ? `product my-3 p-2 duration-500`
                  : `my-3 p-2`
              }
            >
              <div
                onClick={
                  localStorage.getItem("userToken")
                    ? () => detailsNavigate(product.category.name, product.id)
                    : toastError
                }
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
              </div>
              {localStorage.getItem("userToken") ? (
                <>
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
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
