import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductList from "@/components/product/ProductList";
import RootLayout from "../layout";
import { useAxios } from "@/hooks/useAxios";
import VendorCategory from "./vendor-category";
import VendorList from "@/components/vendor/VendorList";

const ProductByFilter = () => {
  const router = useRouter();
  const { query } = router;
  const { makeRequest: vendorsByMainCat } = useAxios("VENDOR_BY_MAIN_CATEGORY");
  const { makeRequest: vendorsBySubCat } = useAxios("VENDOR_BY_SUB_CATEGORY");
  const [vendorsByFilter, setVendorsByFilter] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mainCategory = query.mainCategory;
    const subCategory = query.subCategory;

 if (mainCategory) {
      setVendorsByFilter([]);
      vendorsByMainCat(
        (res) => {
          console.log(res);

          setVendorsByFilter(res);
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
        vendorsBySubCat(
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
      <VendorList vendors={vendorsByFilter} />
    </div>
  );
};

ProductByFilter.getLayout = (page: React.ReactElement) => (
  <RootLayout>{page}</RootLayout>
);

export default ProductByFilter;
