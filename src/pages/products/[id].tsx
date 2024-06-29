import { axiosInstance } from "@/api/axios";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GetServerSideProps } from "next";
import { Product } from "@/api/Product";
import WishListButton from "@/components/product/WishListButton";
import SizesTabs from "@/components/product/SizeTabs";
import PolicyDataTabs from "@/components/product/PolicyDataTabs";
import { CiDeliveryTruck } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";
import ProductsCarousel from "@/components/shared/ProductsCarousel";
import ColorsTabs from "@/components/product/ColorsTabs";
import { Button, Rating } from "@mui/material";
import Image from "next/image";
import RootLayout from "../layout";
import CartButton from "@/components/product/CartButton";
import ProductReivew from "@/components/product/ProductReivew";


const currencyVal = "$";

export default function ProductDetails({ product }: { product: Product }) {
  const [activeColor, setActiveColor] = useState("");
  const [activeSize, setActiveSize] = useState("");

  return (
    <div className="md:my-24 my-4 md:px-12 px-3">
      <p>
        <span
          onClick={() => {}}
          className="cursor-pointer text-gray-700 text-md"
        >
          {product.Shop?.name}
        </span>{" "}
        {product.Shop?.name && product?.Category?.name && (
          <span className="px-4">/</span>
        )}
        <span className="font-medium text-md">{product.Category?.name} </span>
      </p>{" "}
      <div className="mt-4 mb-4 md:grid grid-cols-12 gap-4">
        <div className="md:flex hidden col-span-2 flex-col items-center space-y-6">
          <Image
            alt={product.name}
            src={product?.mainImage}
            height={500}
            width={480}
            className="rounded-md "
          />
          <Image
            alt={product.name}
            height={500}
            width={480}
            src={product?.mainImage}
            className="bg-center  rounded-md bg-cover w-full "
          />
        </div>
        <Image
          alt={product.name}
          className="w-full col-span-4 rounded-md "
          src={product?.mainImage}
          height={720}
          width={920}
        />
        <div className="col-span-6 ml-4">
          <h6 className="text-2xl font-semibold">{product.name} </h6>
          <div className="mt-2 flex items-center">
            <Rating value={product?.rating + ""} />
            <span
              onClick={() => {}}
              className="cursor-pointer px-2 text-gray-700 text-md"
            >
              (0 Reviews)
            </span>
            <span>|</span>
            <span
              onClick={() => {}}
              className="cursor-pointer px-2 text-[#0bbe70] text-md"
            >
              In Stock
            </span>
          </div>
          <div className="flex items-center my-4 space-x-2">
            <span className="text-3xl  text-[#DB4444] ">
              {currencyVal}
              {product?.discountedPrice}
            </span>
            <span className="line-through  text-xl  ">
              {currencyVal}
              {product?.price}
            </span>
          </div>
          <p className="my-4 border-b-2 border-[55 65 81 / 36%] pb-4">
            {product.description}
          </p>
          {/* <div className="flex my-4 items-center">
                        <span>Colours:</span>
                        <div className="flex items-center space-x-2 ml-4">
                            <ColorsTabs
                                setActiveColor={setActiveColor}
                                activeColor={activeColor}
                                color="#199de0"
                            />
                            <ColorsTabs
                                setActiveColor={setActiveColor}
                                activeColor={activeColor}
                                color="#00be70"
                            />
                        </div>
                    </div>
                    <div className="flex my-4 items-center">
                        <span>Size:</span>
                        <div className="flex items-center space-x-2 ml-4">

                            <SizesTabs
                                activeSize={activeSize}
                                setActiveSize={setActiveSize}
                                size={"sm"}
                            />
                            <SizesTabs
                                activeSize={activeSize}
                                setActiveSize={setActiveSize}
                                size={"md"}
                            />
                            <SizesTabs
                                activeSize={activeSize}
                                setActiveSize={setActiveSize}
                                size={"lg"}
                            />

                        </div>
                    </div> */}
          <div className="flex items-center my-4 space-x-4">
            <CartButton product={product} />

            <Button variant="contained" color="primary">
              Chat With Vendor
            </Button>
            {/* <WishListButton /> */}
          </div>
          <div className="border xl:w-[70%]  w-full  border-gray-700  rounded-lg mt-6 pb-1">
            <PolicyDataTabs
              Icon={CiDeliveryTruck}
              desc="Enter your postal code for Delivery Availability"
              title="Free Delivery"
            />
            <div className="w-full border-[0.5px] border-gray-700"></div>
            <PolicyDataTabs
              Icon={TfiReload}
              desc="Free 30 Days Delivery Returns. Details"
              title="Return Delivery"
            />
          </div>
        </div>
      </div>
      <ProductReivew />
      <ProductsCarousel title="Related Items" />
    </div>
  );
}

ProductDetails.propTypes = {
  productData: PropTypes.object,
};

ProductDetails.getLayout = (page: React.ReactElement) => (
  <RootLayout>{page}</RootLayout>
);

export const getServerSideProps: GetServerSideProps<{
  product: Product;
}> = async (context) => {
  const productId = (context.params?.id as string) || "";
  try {
    const response = await axiosInstance.get(
      `https://listing-backend-z4i5.onrender.com/product/get/${productId}`
    );
    const product = response.data.product;
    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product: product,
      },
    };
  } catch (_) {
    return {
      notFound: true,
    };
  }
};
