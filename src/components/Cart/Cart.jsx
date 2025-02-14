import React, { useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartDetails, setcartDetails] = useState(null);
  const [loading, setloading] = useState(false);
  const [currentid, setcurrentid] = useState("");

  let {
    getUserCart,
    removeProductFromCart,
    updateProductCount,
    removeAllProducts,
    cartitemscount,
    setcartitemscount
  } = useContext(CartContext);

  async function getUserProductCart() {
    let response = await getUserCart();
    if (response.data.status == "success") {
      setcartDetails(response.data.data);
    } else {
      //
    }
  }

  async function deleteItem(productId) {
    let response = await removeProductFromCart(productId);
    if (response.data.status == "success") {
      setcartDetails(response.data.data);
      toast.success("Item Deleted Successfully");
      setcartitemscount(cartitemscount - 1)
    } else {
      toast.error("Can't Delete This Item");
    }
  }

  async function deleteCart() {
    let response = await removeAllProducts();
    if (response.data.message == "success") {
      getUserProductCart();
      toast.success("Cart Deleted Successfully");
      setcartitemscount(0)
    } else {
      toast.error("Can't Delete Cart");
    }
  }

  async function updateItem(productId, newCount) {
    setloading(true)
    setcurrentid(productId)
    
    let response = await updateProductCount(productId, newCount);
    if (response.data.status == "success") {
      setloading(false)
      setcartDetails(response.data.data);
      toast.success("Item Updated Successfully");
      if (newCount == 0 ){
        setcartitemscount(cartitemscount - 1)
      }
    } else {
      setloading(false)
      toast.error("Can't Update This Item");
    }
  }

  useEffect(() => {
    getUserProductCart();
  }, []);

  return (
    <>
      {cartDetails?.products.length == 0 ? (
        <h1 className="text-emerald-600 text-center font-bold text-2xl py-5">
          No Data To Show
        </h1>
      ) : cartDetails?.products.length > 0 ? (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => deleteCart()}
              className="bg-red-500 py-1 px-2 text-xl text-white rounded-lg relative r-0 me-12"
            >
              Delete All
            </button>
          </div>
          <h2 className="font-bold text-2xl text-center py-4 text-emerald-600">
            Total Price: {cartDetails.totalCartPrice} EGP
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto w-10/12 ">
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
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className=" border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      <h1 className="font-bold text-lg">
                        {product.product.title.split(" ").slice(0, 4).join(" ")}
                      </h1>
                      <h3 className="font-light">
                        {product.product.category.name}
                      </h3>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => {
                            updateItem(product.product.id, product.count - 1);
                          }}
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 border rounded-full focus:outline-none focus:ring-4  bg-gray-800 text-gray-400 border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <div className="text-white text-lg">{loading && currentid == product.product.id ?<i className="fas fa-spinner fa-spin"></i>: product.count}</div>
                        </div>
                        <button
                          onClick={() => {
                            updateItem(product.product.id, product.count + 1);
                          }}
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium border rounded-full focus:outline-none focus:ring-4 bg-gray-800 text-gray-400 border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      {product.price * product.count} EGP
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="cursor-pointer"
                        onClick={() => {
                          deleteItem(product.product.id);
                        }}
                      >
                        <i className="fas fa-trash fa-lg"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
                 <Link to={`/checkout`}>
                 <button className="bg-emerald-600 rounded-lg my-3 w-full text-white text-center py-3 captalize">Checkout</button>
                 </Link>
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
