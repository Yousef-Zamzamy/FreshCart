import React, { useContext, useEffect, useState } from "react";
import style from "./Categories.module.css";
import { OtherContext } from "../../Context/OtherContext";


export default function Categories() {
  let { getAllCategories } = useContext(OtherContext);
  const [allCategories, setallCategories] = useState(null);

  async function getcategories() {
    let response = await getAllCategories();
    if (response.statusText == "OK") {
      setallCategories(response.data.data);
    } else {
      //
    }
  }

  useEffect(() => {
    getcategories();
  }, []);
  return (
    <>
      {allCategories?.length > 0 ? <div className="row mx-2">
        {allCategories?.map((product) => (
          <div key={product._id} className="w-full md:w-1/3 p-3">
            <div className="product my-3 duration-500 border-2 flex-col text-center justify-between hover:shadow-md hover:shadow-emerald-300">
              <div>
                <img
                  src={product.image}
                  className="w-full h-[300px] object-cover"
                  alt=""
                />
              </div>
              <div className="text-3xl py-4">
                <h3 className="text-emerald-600">{product.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div> : <div className="row">
          <span className="loader"></span>
        </div>}
    </>
  );
}
