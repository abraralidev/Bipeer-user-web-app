import { ProductByFilter } from "@/api/ProductByFilter";
import { useCart } from "@/contexts/CartProvider";
import { Box, Card, Rating, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ service }: { service: ProductByFilter }) => {
  const router = useRouter();
  const [isOnHover, setisOnHover] = useState(false);
 const currencyVal = '$'

 const { dispatch } = useCart();

 const [openSnackBar, setOpenSnackBar] = useState<object>({
   open: false,
   vertical: 'top',
   horizontal: 'center',
 });

//  const { vertical, horizontal, open } = openSnackBar;

 const handleClick = (newState:object) => {
   setOpenSnackBar({ ...newState, open: true });
 };

 const handleClose = () => {
   setOpenSnackBar({ ...openSnackBar, open: false });
 };
  return (
    <Card
      sx={{
        width: { xs: "230px", sm: "250px", md: "290px" },
        height: { xs: "290px", sm: "370px", md: "380px" },
        boxShadow: "none",
        borderRadius: "20px",
        border: "2",
      }}
      variant="elevation"
      onClick={() => {
        router.push(`/products/${service.id}`);
      }}
      className="w-[95%] md:mx-auto md:mb-8 mb-2 pb-4 flex flex-col cursor-pointer border-2 hover:border-[#00000040]"
    >
      <div
        onMouseEnter={() => {
          setisOnHover(true);
        }}
        onMouseLeave={() => {
          setisOnHover(false);
        }}
        className="bg-center relative bg-cover h-60"
      >
        <Image
          src={service.mainImage}
          alt={service.name}
          layout="fill"
          objectFit="contain"
          className="border-b border-b-[#00000024]"
        />
        {isOnHover && (
          <div>
            <div
              onClick={(e) => {
                handleClick({ vertical: 'bottom', horizontal: 'center' });
                console.log('opened 123');
                toast.success(`${service.name} added to cart Successfully`)
                
                e.stopPropagation();
                dispatch({
                  type: "UPDATE_CART_SUBTOTAL",
                  payload: service?.discountedPrice
                    ? service.discountedPrice
                    : service.price,
                });
                dispatch({
                  type: "UPDATE_CART",
                  payload: {
                    id: service.id,
                    quantity: 1,
                    price: service?.discountedPrice
                      ? service.discountedPrice
                      : service.price,
                    title: service?.name,
                    image: service.mainImage,
                    subtotal: service?.discountedPrice
                      ? service.discountedPrice
                      : service.price,
                    shopId: service?.Shop?.id,
                  },
                });
                dispatch({
                  type: "UPDATE_CART_TOTAL",
                });
              }}
              className="absolute bottom-0 right-0 transition-opacity left-0 text-center bg-black text-white text-xs py-2 font-semibold"
            >
              Add To Cart
            </div>
          </div>
        )}
      </div>
      <div className="px-4">
        <Typography className="!mt-6 truncate font-medium">
          {service.name}
        </Typography>
        <Box>
          <Rating name="size-small" defaultValue={3} size="small" />
          <Typography>(20 reviews)</Typography>
        </Box>
        <div className="flex items-center space-x-3">
          <Typography className="text-[#DB4444] font-semibold ">
            {currencyVal + service.discountedPrice}
          </Typography>
          <Typography className="line-through font-semibold">
            {currencyVal + service.price}
          </Typography>
        </div>
      </div>
      {/* <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Item added to cart"
        key={vertical + horizontal}
      /> */}
    </Card>
  );
};

export default ProductCard;
