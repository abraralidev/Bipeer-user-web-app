import React from "react";
import ProfessionalLayout from "../professional/layout";
import { Box, Button, Grid, Typography } from "@mui/material";
import HistoryCard from "@/components/order/HistoryCard";
import { MdDelete } from "react-icons/md";
import EmptyCart from "@/components/cart/EmptyCart";
import Image from "next/image";

const index = () => {
  const favorites = [
    {
      id: 1,
      title: "Product 1",
      mainImage: "/images/product1.jpg", // make sure this path matches an actual image path in your project
      name: "Product Name 1",
      price: 100,
      status: "PENDING",
    },
    {
      id: 2,
      title: "Product 2",
      mainImage: "/images/product2.jpg",
      name: "Product Name 2",
      price: 150,
      status: "PENDING",
    },
    {
      id: 3,
      title: "Product 3",
      mainImage: "/images/product3.jpg",
      name: "Product Name 3",
      price: 200,
      status: "PENDING",
    },
    {
      id: 4,
      title: "Product 4",
      mainImage: "/images/product4.jpg",
      name: "Product Name 4",
      price: 250,
      status: "PENDING",
    },
    {
      id: 5,
      title: "Product 5",
      mainImage: "/images/product5.jpg",
      name: "Product Name 5",
      price: 300,
      status: "PENDING",
    },
  ];

  return (
    <div className="px-15 md:px-24 my-12">
      {favorites.length === 0 ? (
        <>
          <div>
            <EmptyCart />
          </div>
        </>
      ) : (
        <div>
          {" "}
          <Typography variant="h5" mb={4} fontWeight={600}>
            Order History
          </Typography>
          <div className="   sm:flex hidden shadow mb-2 rounded-lg py-1 w-full">
            <div className=" p-1 w-full cursor-pointer">
              <Typography className=" !font-bold text-center">
                Service
              </Typography>
            </div>
            <div className=" p-1 w-full cursor-pointer ">
              <Typography className="  !font-bold text-center">Name</Typography>
            </div>
            <div className=" p-1 w-full cursor-pointer ">
              <Typography className="  !font-bold text-center">
                Price
              </Typography>
            </div>

            <div className="p-1 w-full cursor-pointer ">
              <Typography className="  !font-bold text-center">
                Status
              </Typography>
            </div>
          </div>
          <div className="">
            {favorites.map((item: any) => (
              <>
                <div
                  key={item.id}
                  className="shadow flex  w-full justify-center align-center"
                >
                  <div className=" p-1 w-full cursor-pointer justify-center flex items-center text-center">
                    <Image
                      alt={item.title}
                      src={item.mainImage}
                      width={72}
                      height={72}
                    />
                  </div>
                  <div className=" p-1 flex items-center text-center w-full cursor-pointer justify-center ">
                    <Typography className="!font-medium pt-1 text-center">
                      {item.name}
                    </Typography>
                  </div>
                  <div className=" p-1 w-full cursor-pointer flex items-center text-center  justify-center">
                    <Typography className="  pt-1 text-center">
                      ${item.price}
                    </Typography>
                  </div>

                  <div className="p-1 w-full cursor-pointer flex items-center text-center justify-center">
                    <Typography className="  pt-1 text-center">
                      {item.status}
                    </Typography>
                  </div>
                </div>
                {/* On mobile View */}
              </>
            ))}
          </div>
          <div className="flex flex-col md:justify-between"></div>
        </div>
      )}
    </div>
  );
};

export default index;

index.getLayout = (page: React.ReactElement) => (
  <ProfessionalLayout>{page}</ProfessionalLayout>
);
