import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductList from "@/components/product/ProductList";
import RootLayout from "../layout";
import { useAxios } from "@/hooks/useAxios";

const ProductByFilter = () => {
  const router = useRouter();
  const { query } = router;
  const { makeRequest: productsByKey } = useAxios("PRODUCTS_BY_Filter");
  const { makeRequest: productsByCat } = useAxios("PRODUCTS_BY_CATEGORY");
  const [productsByFilter, setProductsByFilter] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryWord = query.query;
    const category = query.category;

    if (category) {
      productsByCat(
        (res) => {
          console.log(res);
          setLoading(true)
          setProductsByFilter(res);
          setLoading(false)
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
          setLoading(true)
          console.log('loading is ' , loading);
          console.log(res);
          setProductsByFilter(res);
          setLoading(false)
          console.log('loading is ' , loading);
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
    }
  }, [query]);

  return (
    <div>
      <ProductList products={productsByFilter} />
    </div>
  );
};

ProductByFilter.getLayout = (page: React.ReactElement) => (
  <RootLayout>{page}</RootLayout>
);

export default ProductByFilter;
