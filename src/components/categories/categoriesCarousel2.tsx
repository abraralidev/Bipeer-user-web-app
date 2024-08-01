import { Product } from "@/api/Product";
import { useAxios } from "@/hooks/useAxios";
import React from "react";
import Slider from "react-slick";
import catImageArray from "../../assets/imageExport";
// import ProductCard from "./ProductCard";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import LoadingCards from "../shared/LoadingCards";
// import LoadingCards from "./LoadingCards";

type ProductCarouselProps = {
  title: string;
};

const CateCarousel2 = ({ title }: ProductCarouselProps) => {
  //   const products = useAxios("PRODUCTS", true);
  const categories = useAxios("CATEGORIES", true);
  console.log("🚀 ~ CateCarousel2 ~ categories:", categories);

  return (
    <>
      <div className="md:w-full w-[90%] mx-auto mt-[2rem]">
        <Box>
          <Typography my={"15px"} textAlign={"start"} variant="h4">
            {title}
          </Typography>
          <Slider
            responsive={[
              {
                breakpoint: 2500,
                settings: {
                  slidesToShow: 8,
                  //   slidesToScroll: 1,
                  // dots: true,
                },
              },
              {
                breakpoint: 1500,
                settings: {
                  slidesToShow: 8,
                  //   slidesToScroll: 1,
                  // dots: false,
                },
              },
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 8,
                  //   slidesToScroll: 1,
                  // dots: true,
                },
              },

              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 7,
                  //   slidesToScroll: 1,
                  // dots: false,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 6,
                  //   slidesToScroll: 1,
                  // dots: false,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  //   slidesToScroll: 1,
                  // dots: false,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                  //   slidesToScroll: 1,
                  // dots: false,
                },
              },
            ]}
            arrows
            // dots
            // infinite
            draggable
            swipe
            swipeToSlide
            slidesToShow={8}
          >
            {categories?.data?.result?.length &&
              categories?.data?.result?.map((item, index) => (
                <>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    flexDirection={"column"}
                    alignItems="center"
                    //   m="10px"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      height={70}
                      width={70}
                    />
                    <Typography
                      fontSize="12px"
                      textTransform="capitalize"
                      mt="8px"
                      textAlign={"center"}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </>
              ))}
          </Slider>
        </Box>
      </div>
    </>
  );
};

export default CateCarousel2;
