import { Slider } from "@/api/Slider";
import { useAxios } from "@/hooks/useAxios";
import Image from "next/image";
import React from "react";
import Carousel from "react-material-ui-carousel";
import LoadingImage from "../shared/LoadingImage";

const Banner = () => {
  const slider = useAxios("SLIDER", true)
  return (
    <div className="w-full pb-4 mt-4">
      {slider.isLoading ? <LoadingImage /> :
        <Carousel >
          {slider.data?.images?.map((item: Slider) => (
            <Image alt="banner image" width={1280} className='w-full rounded-2xl md:h-[60vh] object-fill' height={700} src={item.image} key={item.id} />
          ))}
        </Carousel>
      }

    </div>
  );
};

export default Banner;
