import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductList from "@/components/product/ProductList";
import RootLayout from "../layout";
import { useAxios } from "@/hooks/useAxios";
import VendorCategory from "./vendor-category";
import VendorList from "@/components/vendor/VendorList";
import ServiceList from "@/components/professional/ServiceList";

const ProductByFilter = () => {
  const router = useRouter();
  const { query } = router;
  const { makeRequest: prosByMainCat } = useAxios("PROS_BY_MAIN_CATEGORY");
  const { makeRequest: prosBySubCat } = useAxios("PROS_BY_SUB_CATEGORY");
  const [vendorsByFilter, setVendorsByFilter] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mainCategory = query.mainCategory;
    const subCategory = query.subCategory;

 if (mainCategory) {
      setVendorsByFilter([]);
      prosByMainCat(
        (res) => {
          
          setVendorsByFilter(res);
          console.log(res);
          
        },
        (err) => {
          console.log(err);
        },
        {
          params: {
            id: mainCategory,
          },
        }
      );
    } else if (subCategory) {
        setVendorsByFilter([]);
        prosBySubCat(
          (res) => {
            console.log("vendor by sub cta");
  
            setVendorsByFilter(res);
          },
          (err) => {
            console.log(err);
          },
          {
            params: {
              id: subCategory,
            },
          }
        );
      } 
  }, [query]);

  return (
    <div>
      <ServiceList professionals={vendorsByFilter} />
    </div>
  );
};

ProductByFilter.getLayout = (page: React.ReactElement) => (
  <RootLayout>{page}</RootLayout>
);

export default ProductByFilter;
