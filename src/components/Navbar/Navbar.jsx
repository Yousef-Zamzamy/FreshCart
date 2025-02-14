import React, { useContext } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
// import useProduct from "../../Hooks/useProduct";

export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  let { cartitemscount, setcartitemscount } = useContext(CartContext);
  let navigate = useNavigate();
  // let { data, isError, error, isLoading } = useProduct();

  function signout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/");
  }

  return (
    <>
      <nav className="bg-slate-300 border-gray-200 fixed top-0 right-0 left-0 z-50 ">
        <div className="flex flex-wrap justify-center gap-3 lg:justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center gap-5">
            <Link
              to=""
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src={logo}
                width={"140px"}
                className="h-8"
                alt="Flowbite Logo"
              />
            </Link>
            {userLogin !== null ? (
              <>
                <ul className="flex gap-5">
                  <li>
                    <NavLink className="text-slate-600" to="">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="text-slate-600 relative"  to="cart">
                      Cart
                      <div className="absolute top-[-15px] right-[-15px] size-5 bg-emerald-500 text-white flex justify-center items-center p-2 rounded-full">
                        {cartitemscount}
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="text-slate-600" to="products">
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="text-slate-600" to="categories">
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="text-slate-600" to="brands">
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="text-slate-600" to="wishlist">
                      Wishlist
                    </NavLink>
                  </li>
                </ul>
              </>
            ) : null}
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <ul className="flex gap-3">
              <li className="flex items-center">
                <i className="fab fa-instagram text-xl hover:scale-150 hover:cursor-pointer transition-all relative duration-300"></i>
              </li>
              <li className="flex items-center">
                <i className="fab fa-facebook text-xl hover:scale-150 hover:cursor-pointer transition-all relative duration-300"></i>
              </li>
              <li className="flex items-center">
                <i className="fab fa-tiktok text-xl hover:scale-150 hover:cursor-pointer transition-all relative duration-300"></i>
              </li>
              <li className="flex items-center">
                <i className="fab fa-twitter text-xl hover:scale-150 hover:cursor-pointer transition-all relative duration-300"></i>
              </li>
              <li className="flex items-center">
                <i className="fab fa-linkedin text-xl hover:scale-150 hover:cursor-pointer transition-all relative duration-300"></i>
              </li>
              <li className="flex items-center">
                <i className="fab fa-youtube text-xl hover:scale-150 hover:cursor-pointer transition-all relative duration-300"></i>
              </li>
            </ul>
            <ul className="flex gap-4">
              {userLogin !== null ? (
                <span
                  onClick={signout}
                  className="cursor-pointer border-emerald-500 border-2 py-1 px-2 rounded-lg hover:bg-emerald-500 hover:border-transparent hover:text-white hover:font-bold transition-[all]"
                >
                  Signout
                </span>
              ) : (
                <>
                  <li>
                    <Link
                      className="border-emerald-500 border-2 py-1 px-2 rounded-lg hover:bg-emerald-500 hover:border-transparent hover:text-white hover:p-2 hover:font-bold transition-[all]"
                      to="login"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="border-emerald-500 border-2 py-1 px-2 rounded-lg hover:bg-emerald-500 hover:border-transparent hover:text-white hover:p-2 hover:font-bold transition-[all]"
                      to="register"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
