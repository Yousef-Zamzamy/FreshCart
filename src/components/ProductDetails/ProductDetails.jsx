import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import useProduct from "../../Hooks/useProduct";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";

export default function getProduct() {
  const [product, setproduct] = useState(null);
  const [relatedProducts, setrelatedProducts] = useState([]);
  let { id, category } = useParams();
  let { addProductToCart, cartitemscount, setcartitemscount } =
    useContext(CartContext);
  const [currentId, setcurrentId] = useState();
  const [Loading, setLoading] = useState(false);
  let { addToWishlist, currentwishId, setcurrenwishtId } =
    useContext(WishlistContext);

  function addToWish(productId) {
    addToWishlist(productId);
    setcurrenwishtId((prevWishIds) => [...prevWishIds, productId]);
    toast.success("Added to Wishlist Successfully");
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

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

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setproduct(res.data.data);
        window.scrollTo(0, 0);
      })
      .catch((res) => {
        console.log(res.data.data);
      });
  }

  function getAllProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let relatedProducts = res.data.data.filter(
          (product) => product.category.name == category
        );
        setrelatedProducts(relatedProducts);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    getProduct(id);
    getAllProducts();
  }, [id]);
  return (
    <>
      <div className="row items-center">
        {product ? (
          <>
            <div className="w-1/4 hover:scale-105 duration-500">
              {product?.images.length > 1 ? (
                <Slider {...settings}>
                  {product?.images.map((src) => (
                    <img key={product.id} src={src} className="w-full" alt="" />
                  ))}
                </Slider>
              ) : (
                <img src={product?.imageCover} className="w-full" alt="" />
              )}
            </div>
            <div className="w-3/4 p-4">
              <h2 className="font-bold text-xl">{product.title}</h2>
              <h3 className="text-gray-500 my-4">{product.description}</h3>
              <h5>{product.category.name}</h5>
              <div className="flex justify-between my-2">
                <span>{product.price} EGP</span>
                <span>
                  <i className="fas fa-star text-yellow-300"></i>
                  {product.ratingsAverage}
                </span>
              </div>
              <div
                onClick={() => {
                  addToWish(product.id);
                }}
                className={
                  currentwishId.includes(product.id)
                    ? "flex justify-end cursor-pointer text-red-600 pointer-events-none"
                    : "flex justify-end cursor-pointer"
                }
              >
                <i className="fa-solid fa-heart text-2xl me-3"></i>
              </div>
              <button
                onClick={() => addToCart(product.id)}
                className="btn bg-emerald-600 text-white px-4 py-2 rounded-lg w-full my-4"
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
          </>
        ) : (
          <span className="loader "></span>
        )}
      </div>

      <div className="row">
        {relatedProducts.length > 0
          ? relatedProducts.map((product) => (
              <div
                key={product.id}
                className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6 "
              >
                <div className="product my-3 p-2 duration-500">
                  <Link
                    to={`/productdetails/${product.category.name}/${product.id}`}
                  >
                    <img src={product.imageCover} className="w-full" alt="" />
                    <h3 className="text-emerald-600">
                      {product.category.name}
                    </h3>
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
            ))
          : null}
      </div>
    </>
  );
}
