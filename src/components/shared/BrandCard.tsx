import React, { useState } from "react";
import moment from "moment";
import { Button } from "@mui/material";
import Image from "next/image"; // Import the Next.js Image component
import { Vendor } from "@/api/User";
import { useRouter } from "next/router";

const BrandCard = ({ brand }: { brand: Vendor }) => {
    const currencyVal = "$";
    const router = useRouter()
    return (
        <div
        
            className="w-[95%] mx-auto mb-8 shadow-lg rounded-tr-md rounded-tl-md flex flex-col cursor-pointer"
        >
            <div
                className="h-40 bg-center rounded-tr-lg rounded-tl-lg bg-opacity-50 hover:bg-opacity-90 relative bg-cover xl:h-48"
            >
                <Image
                    src={brand.photoBanner}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                />
                <div className="absolute inset-0 bg-[#111111] opacity-50"></div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 flex-col flex items-center -translate-y-1/2">
                    <Image
                        src={brand.photoLogo}
                        alt=""
                        width={96}
                        height={96}
                        className="rounded-full border border-white"
                    />
                    <span className="text-white font-bold">{brand.name} </span>
                </div>
            </div>

            <div className="flex xl:flex-row flex-col  w-full items-center md:justify-between py-4 px-4">
                <div>
                    <p className="text-gray-700 ">Category :{brand.category} </p>
                    <p className="text-gray-700 ">
                        Joined {moment(brand.createdAt).format("DD MMM YYYY")}{" "}
                    </p>
                </div>

                <Button
                    onClick={() => {
                        router.push(`/vendors/${brand.id}`)
                    }}
                 variant="outlined" color="secondary">
                    Visit Store
                </Button>
            </div>
        </div>
    );
};

export default BrandCard;
