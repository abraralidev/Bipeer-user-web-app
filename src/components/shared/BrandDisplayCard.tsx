import React from "react";
import { Vendor } from "@/api/User";
import Image from "next/image";
import { Divider, IconButton, Rating, Typography } from "@mui/material";
import { IoHeartOutline } from "react-icons/io5";

const BrandDisplayCard = ({ brand }: { brand: Vendor }) => {
    return (
        <div >
            <div className="flex md:flex-row flex-col-reverse  w-full items-center shadow-md">
                <div className="md:w-1/2  w-full relative bg-[#2D005E] h-[43vh]  md:h-[35vh] ">
                    <div className=" w-full flex md:justify-between my-4">
                        <div className="md:flex items-center py-8 md:pl-8 space-x-6">
                            <Image src={brand.photoLogo} height={96} alt="photo logo" width={96} className="rounded-lg object-contain md:ml-0 ml-6" />
                            <div className="flex flex-col">
                                <Typography color='white' variant="h6" gutterBottom fontWeight={700}>{brand.name} </Typography>
                                <div className="flex items-center mb-2 space-x-2">
                                    <Rating
                                        sx={{
                                            '& .mui-style-h7xmw3': {
                                                color: 'white'
                                            }
                                        }}
                                        size='small' value={5} color="white" />
                                    <Divider orientation="vertical" sx={{
                                        borderColor: 'white'
                                    }}
                                        flexItem
                                    />
                                    <Typography color='white' variant="body2" >
                                        (150 Reviews)
                                    </Typography>
                                </div>
                                <Typography variant="body2" color='white'>House: 00, Road: 00, City-000, Country</Typography>

                            </div>
                        </div>
                        <div>
                            <IconButton color="inherit" sx={{
                                color: 'white'
                            }}>
                                <IoHeartOutline />
                            </IconButton>
                        </div>
                        <div className=" opacity-70 bg-[#2D005E] ">
                        </div>
                    </div>
                </div>
                <Image alt="photo banner" src={brand.photoBanner} height={250} width={500} className="md:h-[35vh] md:w-1/2 w-full object-contain" />
            </div>
        </div>

    );
};

export default BrandDisplayCard;
