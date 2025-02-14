import React from "react";
import style from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <nav className="bg-slate-200 px-5 py-2 border-gray-200 text-slate-700 font-bold  ">
        
        <div>
          <div className="py-3 my-2 border-b-2 border-slate-500">
          <h1 className="font-bold text-2xl my-2">Get the FreshCart App</h1>
          <p className="my-3">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
          <div className="flex justify-between my-3 px-2 mx-auto">
          <input type="email" placeholder="email..." className="w-4/5 mx-2 p-2 rounded-lg" />
          <button className="px-3 py-2 rounded-lg bg-emerald-500 text-white text-md w-1/5 mx-2">Share app link</button>
          </div>
          </div>
          <div  className="py-3 my-2 border-b-2 border-slate-500 flex justify-between">
            <div>
            <p>Payment partener</p>
            </div>
            <div>
            <p>Get deliveres with freshcart</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
