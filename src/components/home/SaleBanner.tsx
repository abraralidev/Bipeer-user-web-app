import { useAxios } from "@/hooks/useAxios";
import Image from "next/image";
import React from "react";
import LoadingImage from "../shared/LoadingImage";

const SaleBanner = () => {
  const slider = useAxios("SLIDER", true)

  return (
    <div className="md:my-16 my-3 md:px-[0] px-[20px]">
      {slider.isLoading ? <LoadingImage /> :
        <Image
          alt="banner image"
          src={slider.data?.images?.[0]?.image}
          className=" rounded-md w-full"
          width={1280}
          height={720}
        />
      }
    </div>
  );
};

export default SaleBanner;
