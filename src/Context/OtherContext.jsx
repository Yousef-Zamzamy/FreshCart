import axios from "axios";
import { createContext} from "react";

export let OtherContext = createContext();

export default function OtherContextProvider(props) {
 
 
    function getAllCategories() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => res)
      .catch((err) => err);
  }

    function getAllBrands() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => res)
      .catch((err) => err);
  }

  function getAllOrders() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/`)
      .then((res) => res)
      .catch((err) => err);
  }


  return (
    <OtherContext.Provider value={{getAllCategories , getAllBrands , getAllOrders }}>{props.children}</OtherContext.Provider>
  );
}
