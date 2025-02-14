import React, { useContext, useEffect, useState } from "react";
import style from "./Brands.module.css";
import { OtherContext } from "../../Context/OtherContext";

export default function Brands() {
  let { getAllBrands } = useContext(OtherContext);
  const [allBrands, setallBrands] = useState(null);

  async function getBrands() {
    let response = await getAllBrands();
    if (response.statusText == "OK") {
      setallBrands(response.data.data);
    } else {
      //
    }
  }

  useEffect(() => {
    getBrands();
  }, []);
  return (
    <>
      <div className="">
        <h1 className="text-center text-4xl text-emerald-600 capitalize my-5 font-bold">
          All Brands
        </h1>
      </div>

      {allBrands?.length > 0 ? (
        <div className="row mx-2">
          {allBrands?.map((product) => (
            <div key={product._id} className="w-full md:w-1/3 lg:w-1/4 p-3">
              <div className="product my-3 duration-500 border-2 flex-col text-center justify-between hover:shadow-md hover:shadow-emerald-300">
                <div>
                  <img src={product.image} className="w-full" alt="" />
                </div>
                <div className="text-3xl py-4">
                  <h3 className="text-emerald-600">{product.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row">
          <span className="loader"></span>
        </div>
      )}
    </>
  );
}
