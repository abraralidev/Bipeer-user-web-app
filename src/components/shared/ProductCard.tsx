import React, { useState } from "react";
import { Box, Card, Rating, Snackbar, Typography } from "@mui/material";
import { Product } from "@/api/Product";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCart } from "@/contexts/CartProvider";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-toastify";

const currencyVal: string = "$";

const ProductCard = ({ product }: { product: Product }) => {
  const [isOnHover, setisOnHover] = useState(false);
  const { dispatch } = useCart();
  const router = useRouter();

  const [openSnackBar, setOpenSnackBar] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = openSnackBar;

  const handleClick = (newState) => {
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
        router.push(`/products/${product.id}`);
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
          src={product.mainImage}
          alt={product.name}
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
                toast.success(`${product.name} added to cart Successfully`)
                
                e.stopPropagation();
                dispatch({
                  type: "UPDATE_CART_SUBTOTAL",
                  payload: product?.discountedPrice
                    ? product.discountedPrice
                    : product.price,
                });
                dispatch({
                  type: "UPDATE_CART",
                  payload: {
                    id: product.id,
                    quantity: 1,
                    price: product?.discountedPrice
                      ? product.discountedPrice
                      : product.price,
                    title: product?.name,
                    image: product.mainImage,
                    subtotal: product?.discountedPrice
                      ? product.discountedPrice
                      : product.price,
                    shopId: product?.Shop?.id,
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
          {product.name}
        </Typography>
        <Box>
          <Rating name="size-small" defaultValue={3} size="small" />
          <Typography>(20 reviews)</Typography>
        </Box>
        <div className="flex items-center space-x-3">
          <Typography className="text-[#DB4444] font-semibold ">
            {currencyVal + product.discountedPrice}
          </Typography>
          <Typography className="line-through font-semibold">
            {currencyVal + product.price}
          </Typography>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Item added to cart"
        key={vertical + horizontal}
      />
    </Card>
  );
};

export default ProductCard;
