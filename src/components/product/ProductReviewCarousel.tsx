import { Product } from "@/api/Product";
import { useAxios } from "@/hooks/useAxios";
import React from "react";
import Slider from "react-slick";
import { Stack, Typography } from "@mui/material";
import { Reviewdata } from "@/api/Category";
import CategoryCard from "../professional/CategoryCard";
import ProductReviewCard from "./ProductReviewCard";

type CategoriesCarouselProps = {
  title: string;
};

const ProductReviewCarousel = ({ title }: CategoriesCarouselProps) => {
  return (
    <div className="w-[90%] mx-auto">
      <Stack justifyContent="space-between">
        <Typography gutterBottom mb={2} variant="h6">
          {title}{" "} ({Reviewdata.length})  
        </Typography>
      </Stack>

      {/* <Slider
        responsive={[
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 770,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              initialSlide: 1,
            },
          },
        ]}
        arrows
        dots
        infinite
        slidesToShow={4}
        slidesToScroll={1}
        autoplay
      > */}
        {Reviewdata.map((review) => (
          <ProductReviewCard
            name={review.Customer.name}
            rating={review.rating}
            key={review.id}
            review={review.review}

          />
        ))}
      {/* </Slider> */}
    </div>
  );
};

export default ProductReviewCarousel;
