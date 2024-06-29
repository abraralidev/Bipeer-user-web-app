import { categoryData } from "@/api/Category";
import { Service } from "@/api/Services";
import { Avatar, IconButton, Rating, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { IoHeart, IoStar, IoStarOutline } from "react-icons/io5";

const SelectedGigCard2 = ({ service }: { service: Service }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/professional/${service.id}`)}
      style={{minHeight:'320px'}}
      className="w-[95%] mx-2 mb-8 cursor-pointer shadow-md  rounded-2xl"
    >
      <Image
        src={service.image}
        alt={service.name}
        width={200}
        height={150}
        className="w-full rounded-2xl h-[26vh] "
      />
      <div className="py-4 px-4">
        <div className="flex  items-center space-x-1">
          <Avatar
            sx={{
              width: 30,
              height: 30,
            }}
            src={service.photoLogo}
            alt={service.Professional.name}
          >
            {service.name.toUpperCase()}
          </Avatar>
          <Typography variant="subtitle1" sx={{textWrap:'nowrap', overflow:'hidden'}} fontSize={'13px'} fontWeight={400}>
            {service.name}
          </Typography>
        </div>
        {/* <Typography fontSize={15} className="truncate" mt={1} fontWeight={600}>
          {service.title}{" "}
        </Typography> */}
        <div className="flex mt-3 items-center">
        <Rating  defaultValue={4} size="small" />
          <Typography color="gray">({service.rating})</Typography>
        </div>
        <div className="flex items-center mt-auto justify-between">
          <IconButton>
            <IoHeart />
          </IconButton>
          <Typography color="black">$ {service.price} </Typography>
        </div>
      </div>
    </div>
  );
};

export default SelectedGigCard2;
