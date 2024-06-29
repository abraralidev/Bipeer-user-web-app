import { Product } from "@/api/Product";
import { useAxios } from "@/hooks/useAxios";
import React from "react";
import Slider from "react-slick";
import { Button, Stack, Typography } from "@mui/material";
import { categoryData } from "@/api/Category";
import CategoryCard from "./CategoryCard";
import SelectedGigCard from "./SelectedGigCard";
import { Service } from "@/api/Services";
import { useRouter } from "next/router";

type SelectedGigsProps = {
  title: string;
};

const SelectedGigs = ({ title }: SelectedGigsProps) => {
  const services = useAxios("GET_SERVICES", true);
  const router = useRouter();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    // slidesToScroll: 1,
    arrows: true,
    autoplay: services.data?.services?.length > 4,
    responsive: [
        {
            breakpoint: 2500,
            settings: {
                slidesToShow: 5,
                // slidesToScroll: 1,
                dots: true,
            },
        },
        {
            breakpoint: 1500,
            settings: {
                slidesToShow: 5,
                // slidesToScroll: 1,
                dots: false,
            },
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 5,
                // slidesToScroll: 1,
                dots: true,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                // slidesToScroll: 1,
                dots: false,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                // slidesToScroll: 1,
                dots: false,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                // slidesToScroll: 1,
                dots: false,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                // slidesToScroll: 1,
                dots: false,
            },
        },
    ],
};
  return (
    <div className="my-3 w-[90%] mx-auto">
      <Stack justifyContent="space-between" direction="row">
        <Typography
          gutterBottom
          mb={4}
          className="md:text-xl text-md font-medium "
        >
          {title}{" "}
        </Typography>
        <div>
          <Button
            onClick={() => router.push("/professional/category")}
            variant="text"
            color="inherit"
            size="small"
          >
            View All
          </Button>
        </div>
      </Stack>

      <Slider
       {...settings}
      >
        {services.data?.services?.map((service: Service) => (
          <SelectedGigCard service={service} />
        ))}
      </Slider>
    </div>
  );
};

export default SelectedGigs;
