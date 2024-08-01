import { Product } from "@/api/Product";
import { useAxios } from "@/hooks/useAxios";
import React from "react";
import Slider from "react-slick";
import catImageArray from "../../assets/imageExport";
// import ProductCard from "./ProductCard";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import LoadingCards from "../shared/LoadingCards";
import { useRouter } from "next/router";
// import LoadingCards from "./LoadingCards";

type ProductCarouselProps = {
  title: string;
};

const CateCarousel = ({ title }: ProductCarouselProps) => {
  //   const products = useAxios("PRODUCTS", true);
  const router = useRouter();

  return (
    <>
      <div className="md:w-full w-[90%] mx-auto  hidden sm:block">
        <Stack justifyContent="space-between">
          <Typography gutterBottom mb={2} variant="h6">
            {title}{" "}
          </Typography>
        </Stack>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          m="10px"
        >
          {catImageArray &&
            catImageArray.map((item, index) => (
              <>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flexDirection={"column"}
                  alignItems="center"
                  //   m="10px"
                >
                  <Image
                    src={item.url}
                    alt={item.text}
                    height={50}
                    width={50}
                    className="cursor-pointer"
                    onClick={() => {
                      router.push(item.link);
                    }}
                  />
                  <Typography
                    fontSize="12px"
                    textTransform="capitalize"
                    mt="8px"
                  >
                    {item.text}
                  </Typography>
                </Box>
              </>
            ))}
        </Box>
      </div>

      <div className="md:w-full w-[90%] mx-auto block sm:hidden">
        <Box>
          <Slider arrows infinite={false} slidesToShow={3}>
            {catImageArray.map((item, index) => (
              <>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  flexDirection={"column"}
                  alignItems="center"
                  //   m="10px"
                >
                  <Image
                    src={item.url}
                    alt={item.text}
                    height={50}
                    width={50}
                  />
                  <Typography
                    fontSize="12px"
                    textTransform="capitalize"
                    mt="8px"
                  >
                    {item.text}
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

export default CateCarousel;
