import { Product } from "@/api/Product";
import { useAxios } from "@/hooks/useAxios";
import React from "react";
import Slider from "react-slick";
import { Grid, Stack, Typography } from "@mui/material";
import { categoryData } from "@/api/Category";
import CategoryCard from "./CategoryCard";
import SellerCard from "./SellerCard";
import { Professional } from "@/api/User";
import { useRouter } from "next/router";

type SellerProps = {
  title: string;
};

const Seller = ({ title }: SellerProps) => {
  const professionals = useAxios("GET_PROFESSIONAL", true);
  return (
    <div className="w-[90%] mx-auto mt-6 mb-3  ">
      <Stack justifyContent="space-between">
        <Typography gutterBottom mb={4} variant="h6">
          {title}{" "}
        </Typography>
      </Stack>

      {/* <Grid container spacing={2}> */}
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
                slidesToShow: 3,
                slidesToScroll: 2,
                initialSlide: 2,
              },
            },
          ]}
          arrows
          dots
          infinite
          slidesToShow={4}
          slidesToScroll={1}
          autoplay
        >
          {professionals.data?.professionals?.map(
            (professional: Professional) => (
              <>
                {/* <Grid item xl={3} md={3} sm={4} xs={6}> */}
                  <SellerCard professional={professional} />
                {/* </Grid> */}
              </>
            )
          )}
        </Slider>
      {/* </Grid> */}
    </div>
  );
};

export default Seller;
