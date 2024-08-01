import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductList from "@/components/product/ProductList";
import RootLayout from "../layout";
import { useAxios } from "@/hooks/useAxios";
import { CircularProgress } from "@mui/material";

const ProductByFilter = () => {
  const router = useRouter();
  const { query } = router;
  const { makeRequest: productsByKey, isLoading: product_loading1 } =
    useAxios("PRODUCTS_BY_Filter");
  const { makeRequest: productsByCityAreaId, isLoading: product_loading2 } =
    useAxios("PRODUCTS_BY_CITY_AREA_ID");
  const { makeRequest: productsByCat, isLoading: product_loading3 } = useAxios(
    "PRODUCTS_BY_CATEGORY"
  );
  const [productsByFilter, setProductsByFilter] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryWord = query.query;
    const category = query.category;
    const cityAreaId = query.cityAreaId;

    if (category) {
      productsByCat(
        (res) => {
          console.log(res);
          setLoading(true);
          setProductsByFilter(res);
          setLoading(false);
        },
        (err) => {
          console.log(err);
        },
        {
          params: {
            categoryId: category,
          },
        }
      );
    } else if (queryWord) {
      productsByKey(
        (res) => {
          setLoading(true);
          console.log("loading is ", loading);
          console.log(res);
          setProductsByFilter(res);
          setLoading(false);
          console.log("loading is ", loading);
        },
        (err) => {
          console.log(err);
        },
        {
          query: {
            query: queryWord,
          },
        }
      );
    } else if (cityAreaId) {
      productsByCityAreaId(
        (res) => {
          setLoading(true);
          console.log("loading is ", loading);
          console.log(
            "products by cate aushdkashdkashdkjsahdkjsahd*******",
            res
          );
          setProductsByFilter(res?.result);
          setLoading(false);
          console.log("loading is ", loading);
        },
        (err) => {
          console.log(err);
        },
        {
          query: {
            query: cityAreaId,
          },
        }
      );
    }
  }, [query]);

  return (
    <div>
      {product_loading1 && product_loading2 && product_loading3 ? (
        <div className="h-[80vh] flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <ProductList products={productsByFilter} />
      )}
    </div>
  );
};

ProductByFilter.getLayout = (page: React.ReactElement) => (
  <RootLayout>{page}</RootLayout>
);

export default ProductByFilter;
