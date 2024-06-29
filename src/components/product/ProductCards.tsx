import { Service } from "@/api/Services";
import { useAxios } from "@/hooks/useAxios";
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductsCards = ({products}) => {
  // const services = useAxios("GET_SERVICES", true);
    console.log(products);

  return (
<div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
  {products?.products && products.products.map((service: Service) => (
    <ProductCard key={service.id} service={service} />
  ))}
</div>

  );
};

export default ProductsCards;
