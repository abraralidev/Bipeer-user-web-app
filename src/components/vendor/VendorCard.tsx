import { Shop } from "@/api/Shop";
import { Rating, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const VendorCard = ({ service }: { service: Shop }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/vendors/${service.id}`)}
      style={{ minHeight: "320px" }}
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
        <div className="flex  items-center space-x-1"></div>
        <Typography fontSize={15} className="truncate" mt={1} fontWeight={600}>
          {service.name}{" "}
        </Typography>
        <div className="flex mt-3 items-center">
          <Rating defaultValue={4} size="small" />
          <Typography> (10 reviews)</Typography>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
