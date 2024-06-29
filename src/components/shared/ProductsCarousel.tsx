import { Product } from "@/api/Product";
import { useAxios } from "@/hooks/useAxios";
import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { Stack, Typography } from "@mui/material";
import LoadingCards from "./LoadingCards";

type ProductCarouselProps = {
  title: string;
};

const ProductsCarousel = ({ title }: ProductCarouselProps) => {
  const products = useAxios("PRODUCTS", true);



  return (
    <div className="md:w-full w-[90%] mx-auto">
      <Stack justifyContent="space-between">
        <Typography gutterBottom mb={2} variant="h6">
          {title}{" "}
        </Typography>
      </Stack>

      {products.isLoading ? (
        <LoadingCards />
      ) : (
        <Slider
          responsive={[
            {
              breakpoint: 2500,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                dots: true,
              },
            },
            {
                breakpoint: 1500,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  dots: false,
                },
              },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                dots: true,
              },
            },
            
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: false,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: false,
              },
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: false,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: false,
              },
              
            },
          ]}
          arrows
          dots
          infinite
        //   slidesToShow={4}
        //   slidesToScroll={2}
        //   autoplay
        >
          {products.data?.products?.map((product: Product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductsCarousel;
