import { Product } from "@/api/Product";
import { useAxios } from "@/hooks/useAxios";
import React from "react";
import Slider from "react-slick";
import { Stack, Typography } from "@mui/material";
import { categoryData } from "@/api/Category";
import CategoryCard from "./CategoryCard";

type CategoriesCarouselProps = {
  title: string;
};

const CategoiresCarousel = ({ title }: CategoriesCarouselProps) => {
  return (
    <div className="w-[90%] mx-auto">
      <Stack justifyContent="space-between">
        <Typography gutterBottom mb={4} variant="h6">
          {title}{" "}
        </Typography>
      </Stack>

      <Slider
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
              slidesToShow: 4,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
        ]}
        arrows
        dots
        infinite
        slidesToShow={6}
        slidesToScroll={2}
        autoplay
      >
        {categoryData.map((category) => (
          <CategoryCard
            image={category.image}
            title={category.name}
            key={category.name}
          />
        ))}
      </Slider>
    </div>
  );
};

export default CategoiresCarousel;
