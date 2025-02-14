import React, { useContext, useEffect, useState } from "react";
import style from "./Wishlist.module.css";
import { WishlistContext } from "../../Context/WishlistContext";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Wishlist() {
  const [loading, setloading] = useState(false);
  let { getWishlist, addToWishlist, removeFromWishlist , removeidwish } =
    useContext(WishlistContext);
  const [wishList, setwishList] = useState(null);

  let { addProductToCart, setcartitemscount, cartitemscount } = useContext(CartContext);

  async function addToCart(id) {
    setloading(true);
    let response = await addProductToCart(id);
    if (response.data.status == "success") {
      setloading(false);
      deletewishitem(id);
      toast.success(response.data.message);
      setcartitemscount(cartitemscount + 1);
      removeidwish(id)
    } else {
      setloading(false);
      toast.error(response.data.message);
    }
  }

  async function allwishlist() {
    setloading(true);
    let response = await getWishlist();
    if (response.data.status == "success") {
      setloading(false);
      setwishList(response.data.data);
    }
  }

  async function deletewishitem(productId) {
    let response = await removeFromWishlist(productId);
    allwishlist();
    removeidwish(productId)
  }

  useEffect(() => {
    allwishlist();
  }, []);

  return (
    <>
      {wishList?.length == 0 ? (
        <h1 className="text-emerald-600 text-center font-bold text-2xl py-5">
          No Data To Show
        </h1>
      ) : wishList?.length > 0 ? (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto w-10/12 my-6 ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
              <thead className="text-sm  uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Add
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {wishList.map((product) => (
                  <tr
                    key={product.id}
                    className=" border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      <h1 className="font-bold text-lg">
                        {product?.title.split(" ").slice(0, 4).join(" ")}
                      </h1>
                      <h3 className="font-light">{product.category.name}</h3>
                    </td>

                    <td className="px-6 py-4 font-semibold text-white">
                      {product.price} EGP
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          addToCart(product.id);
                        }}
                      >
                        <button className="border-2 px-5 py-3 rounded-3xl cursor-pointer hover:scale-105 duration-300 hover:border-emerald-600 hover:text-white hover:text-md">Add To Cart</button>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          deletewishitem(product.id);
                        }}
                      >
                        <i className="fas fa-trash fa-lg"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="row">
          <span className="loader"></span>
        </div>
      )}
    </>
  );
}
