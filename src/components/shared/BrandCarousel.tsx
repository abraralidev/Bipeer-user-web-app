import { Product } from "@/api/Product";
import { useAxios } from "@/hooks/useAxios";
import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Vendor } from "@/api/User";
import BrandCard from "./BrandCard";
import LoadingCards from "./LoadingCards";
import { useRouter } from "next/router";

type BrandCarouselProps = {
  title: string;
};

const BrandCarousel = ({ title }: BrandCarouselProps) => {
  const vendors = useAxios("VENDORS", true);

  const router = useRouter();

  return (
    <div className="md:w-full w-[90%] mx-auto">
      <Box justifyContent="space-between" display="flex">
        <Typography gutterBottom mb={4} variant="h6">
          {title}{" "}
        </Typography>
        <div>
          <Button
            variant="text"
            color="inherit"
            onClick={() => {
              router.push("/vendors/vendor-category");
            }}
          >
            View All
          </Button>
        </div>
      </Box>

      {vendors.isLoading ? (
        <LoadingCards />
      ) : (
        <Slider
          responsive={[
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1,
                dots: false,
              },
            },
          ]}
          arrows
          dots
          infinite
          slidesToShow={3}
          autoplay
        >
          {vendors.data?.vendors?.map((vendor: Vendor) => (
            <BrandCard brand={vendor} key={vendor.id} />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default BrandCarousel;
