import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProduct() {
    function getProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
      }
    
      let productInfo = useQuery({
        queryKey: ["recentProducts"],
        queryFn: getProducts,
        staleTime: 10000,
        retry: 3,
        select: (data) => data.data.data
      });
    return productInfo;
}
