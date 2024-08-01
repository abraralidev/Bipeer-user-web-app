import { axiosInstance } from "@/api/axios";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GetServerSideProps } from "next";
import { Product } from "@/api/Product";
import WishListButton from "@/components/product/WishListButton";
import SizesTabs from "@/components/product/SizeTabs";
import { Swiper, SwiperSlide } from "swiper/react";
import MessageIcon from "@mui/icons-material/Message";
import PolicyDataTabs from "@/components/product/PolicyDataTabs";
import { CiDeliveryTruck } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";
import ProductsCarousel from "@/components/shared/ProductsCarousel";
import ColorsTabs from "@/components/product/ColorsTabs";
import { Avatar, Box, Button, Rating, Typography } from "@mui/material";
import Image from "next/image";
import RootLayout from "../layout";
import CartButton from "@/components/product/CartButton";
import ProductReivew from "@/components/product/ProductReivew";
import { useParams } from "next/navigation";
import { useAxios } from "@/hooks/useAxios";
import Link from "next/link";
import { useUser } from "@/contexts/UserProvider";
import { fireBaseDB } from "@/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useMessagesContext } from "@/contexts/ChatMessagesProvider";
import Slider from "react-slick";
import { Pagination } from "swiper/modules";
import "swiper/css";

const currencyVal = "$";

export default function ProductDetails({ product }: { product: Product }) {
  const [activeColor, setActiveColor] = useState("");
  const [activeSize, setActiveSize] = useState("");
  const { data } = useAxios("CURRENT_PROFILE", true);
  const { user, setUser } = useUser();
  setUser(data.customer);
  // console.log("🚀 ~ ProductDetails ~ user:", user);
  const [reviews, setReviews] = useState([]);
  const [mianImageFromGallery, SetmianImageFromGallery] = useState("");
  const { makeRequest: getProductReviews } = useAxios("GET_PRODUCT_REVIEWS");
  const { setVendorName } = useMessagesContext();

  const params = useParams();
  const productID = params.id;
  const Vendor_ID = product?.Shop?.Vendor?.id;
  const Customer_ID = user?.id;

  const router = useRouter();

  const chatIconsStyles = {
    border: "1px solid",
    padding: "6px",
    fontSize: "45px",
    borderRadius: "57%",
    background: "purple",
    color: "white",
  };

  const initializeChat = async (customerID, vendorID) => {
    try {
      if (!customerID) {
        console.error("CustomerID is undefined or null.");
        return;
      }

      setVendorName(product?.Shop?.name as string);

      const usersCollectionRef = collection(
        fireBaseDB,
        "chats",
        vendorID,
        "users"
      );

      // Check if the customerID exists in the users collection
      const querySnapshot = await getDocs(
        query(usersCollectionRef, where("userId", "==", customerID))
      );

      if (querySnapshot.empty === false) {
        // console.log("🚀 ~ initializeChat ~ querySnapshot:", querySnapshot.docs);
        console.log("User exists");
        router.push(`/chat/${vendorID} `);
        return;
      }

      // Initialize a new document with the provided customerID
      const docRef = doc(usersCollectionRef, customerID);
      const timestamp = new Date();

      await setDoc(docRef, {
        // lastMessage: "",
        lastMessageTimestamp: timestamp,
        timestamp: timestamp,
        updatedAt: timestamp,
        userId: customerID,
        userName: user.name,
        // userUnreadCount: 0,
        // vendorUnreadCount: 0,
      });

      console.log(
        "Initialized document for customer ID:",
        customerID,
        user.name
      );
    } catch (error) {
      console.error("Error checking or initializing user document:", error);
    }
  };

  useEffect(() => {
    getProductReviews(
      (res) => {
        // console.log(res.result?.ProductRating);
        setReviews(res.result?.ProductRating);
      },
      (err) => {
        console.log(err);
      },
      {
        params: {
          id: String(productID),
        },
      }
    );
    getProductReviews();
  }, [productID]);

  // const product
  const settings = {
    speed: 500,
    draggable: true,
    swipe: true,
    verticalSwiping: true,
    swipeToSlide: true,
    slidesToShow: 4,
    vertical: true,
  };

  return (
    <div className="md:mt-[2rem] md:mb-[6rem] my-4 md:pr-[6rem] md:pl-[6rem] pr-3 pl-[6rem]">
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
        <div className=" col-span-2  ">
          <Box>
            <Swiper
              style={{ height: "320px" }}
              direction="vertical"
              spaceBetween={15}
              slidesPerView={3}
              mousewheel={true}
              navigation
              modules={[Pagination]}
              pagination={{ clickable: true }}
              className="mySwiper"
            >
              <SwiperSlide>
                <Image
                  alt={product?.name as string}
                  src={product?.mainImage as string}
                  height={90}
                  width={90}
                  style={{
                    border: "1px solid #00000026",
                    padding: "4px",
                    borderRadius: "20px",
                    objectFit: "contain",
                  }}
                  className="cursor-pointer h-[100px] w-[100px]"
                  onClick={() => {
                    console.log("pic is from gallery link", product?.mainImage);
                    SetmianImageFromGallery(product?.mainImage as string);
                  }}
                />
              </SwiperSlide>

              {product.galleryImages.length > 0 &&
                product.galleryImages.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      alt={item as string}
                      src={item as string}
                      height={90}
                      width={90}
                      style={{
                        border: "1px solid #00000026",
                        padding: "4px",
                        borderRadius: "20px",
                        objectFit: "contain",
                      }}
                      className="cursor-pointer h-[100px] w-[100px]"
                      onClick={() => {
                        console.log("pic is from gallery link", item);
                        SetmianImageFromGallery(item as string);
                      }}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </Box>
        </div>
        <Image
          alt={product.name}
          className="w-full col-span-4 rounded-md "
          src={
            mianImageFromGallery === ""
              ? product?.mainImage
              : mianImageFromGallery
          }
          style={{ border: "1px solid #0000000f" }}
          height={100}
          width={100}
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
          {/* <p className="my-4 border-b-2 border-[55 65 81 / 36%] pb-4">
          {product.description}
          </p> */}
          <div
            className="my-4 border-b-2 border-[55 65 81 / 36%] pb-4"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

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

            {/* <Button
              onClick={() => {
                initializeChat(Customer_ID, Vendor_ID);
              }}
            >
              Chat With Vendor
            </Button> */}
            {/* <WishListButton /> */}
          </div>
          <div className="border xl:w-[50%]  w-full  border-gray-700  rounded-lg mt-6 pb-1">
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
          <Box className="flex xl:w-[50%] mt-2 items-center bg-gray-200 p-4 rounded-lg">
            <Avatar
              alt="Damasco Logo"
              src="https://path-to-your-image/logo.jpg" // Replace with the actual image path
              className="w-12 h-12 mr-4"
            />
            <Box className="flex-1 ">
              <Typography variant="h6">Damasco</Typography>
              <Typography variant="body2">Rating: 4.5</Typography>
            </Box>
            <MessageIcon
              onClick={() => {
                initializeChat(Customer_ID, Vendor_ID);
              }}
              className="cursor-pointer"
              sx={chatIconsStyles}
            />
          </Box>
        </div>
      </div>
      <ProductReivew reviews={reviews} />
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
