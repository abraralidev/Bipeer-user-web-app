import React from "react";
import * as yup from "yup";
import { Button, TextField, Typography } from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CartTotals } from "./CartTotals";
import EmptyCart from "./EmptyCart";
import { MdCancel, MdDelete } from "react-icons/md";
import { useCart } from "@/contexts/CartProvider";
import Image from "next/image";

const schema = yup.object().shape({
  coupon: yup.string(),
});

const defaultValues = {
  coupon: "",
};

export default function UserCart() {
  const {
    state: { cart },
    dispatch,
  } = useCart();
  console.log("🚀 ~ UserCart ~ cart:", cart);

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  // function onSubmit({ coupon }) {
  //     console.log("coupon", coupon);
  // }

  return (
    <div className="px-15 md:px-24 my-12">
      {cart.length === 0 ? (
        <>
          <div>
            <EmptyCart />
            {/* <Typography variant="h5" className="my-24">
              Cart is empty
            </Typography> */}
            {/* <WhatsAppIcon /> */}
          </div>
        </>
      ) : (
        <div>
          {" "}
          <Typography variant="h5" mb={4} fontWeight={600}>
            Cart
          </Typography>
          <div className="   sm:flex hidden shadow mb-2 rounded-lg py-1 w-full">
            {/* <div className=" p-2 w-full cursor-pointer">
                            <Typography></Typography>
                        </div> */}
            <div className=" p-1 w-full cursor-pointer">
              <Typography className=" !font-bold text-center">
                Product
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
            <div className=" p-1 w-full cursor-pointer ">
              <Typography className="  !font-bold text-center">
                Quantity
              </Typography>
            </div>
            <div className="p-1 w-full cursor-pointer ">
              <Typography className="  !font-bold text-center">
                Subtotal
              </Typography>
            </div>
            <div className="p-1 w-full cursor-pointer ">
              <Typography className="  !font-bold text-center">
                Delete
              </Typography>
            </div>
          </div>
          <div className="">
            {cart.map((item: any) => (
              <>
                <div
                  key={item.id}
                  className="shadow flex  w-full justify-center align-center"
                >
                  {/* <div className=" p-2 w-full cursor-pointer flex justify-center align-center items-center text-center">
                                        <MdCancel
                                            className="pt-2 cursor-pointer !text-3xl text-red"
                                            onClick={() => {
                                                dispatch(removeCartItem(item.id));
                                                dispatch(updateCartSubtotal());
                                                dispatch(updateCartTotal());
                                            }}
                                        />

                                    </div> */}
                  <div className=" p-1 w-full cursor-pointer justify-center flex items-center text-center">
                    <Image
                      alt={item.title}
                      src={item.image}
                      width={72}
                      height={72}
                    />
                  </div>
                  <div className=" p-1 flex items-center text-center w-full cursor-pointer justify-center ">
                    <Typography className="!font-medium pt-1 text-center">
                      {item.title}
                    </Typography>
                  </div>
                  <div className=" p-1 w-full cursor-pointer flex items-center text-center  justify-center">
                    <Typography className="  pt-1 text-center">
                      ${item.price}
                    </Typography>
                  </div>
                  <div className=" p-1 w-full cursor-pointer flex items-center text-center justify-center">
                    <Typography className="  pt-1">
                      <div className=" flex">
                        <div
                          className=" py-1 px-2 w-full cursor-pointer"
                          onClick={() => {
                            // dispatch(incrementCartQuantity(item.id));
                            dispatch({
                              type: "INCREMENT_CART_QUANTITY",
                              payload: item.id,
                            });
                            // dispatch(updateCartSubtotal());
                            // dispatch({
                            //     type: "UPDATE_CART_SUBTOTAL"
                            // })
                            dispatch({
                              type: "UPDATE_CART_TOTAL",
                            });
                            // dispatch(updateCartTotal());
                          }}
                        >
                          <Typography className="text-center">+</Typography>
                        </div>
                        <div className=" py-1 px-2 w-full cursor-pointer ">
                          <Typography className="text-center">
                            {item.quantity}
                          </Typography>
                        </div>
                        <div
                          className="py-1 px-2 w-full cursor-pointer"
                          onClick={() => {
                            dispatch({
                              type: "DECREMENT_CART_QUANTITY",
                              payload: item.id,
                            });
                            // dispatch(updateCartSubtotal());
                            // dispatch({
                            //     type: "UPDATE_CART_SUBTOTAL"
                            // })
                            dispatch({
                              type: "UPDATE_CART_TOTAL",
                            });
                          }}
                        >
                          <Typography className="text-center">-</Typography>
                        </div>
                      </div>
                    </Typography>
                  </div>
                  <div className="p-1 w-full cursor-pointer flex items-center text-center justify-center">
                    <Typography className="  pt-1 text-center ">
                      ${item.subtotal}
                      {/* {item.quantity * item.price} */}
                    </Typography>
                  </div>
                  <div className="p-1 w-full cursor-pointer flex items-center text-center justify-center">
                    <Button  onClick={() => {
                            // dispatch(incrementCartQuantity(item.id));
                            dispatch({
                              type: "REMOVE_CART_ITEM",
                              payload: item.id,
                            });
                            
                          }}>
                      <MdDelete/>
                    </Button>
                  </div>
                </div>
                {/* On mobile View */}
              </>
            ))}
          </div>
          <div className="flex flex-col md:justify-between">
            <form
              name="loginForm"
              noValidate
              className="flex flex-col md:flex-row items-start space-y-3 md:space-y-0 md:space-x-3 m-2 md:w-1/2 w-full mt-4"
            >
              <div className="flex flex-col md:flex-row md:items-start md:space-x-3 w-full">
                <Controller
                  name="coupon"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className=""
                      label="Coupon Code"
                      autoFocus
                      type="text"
                      size="small"
                      error={!!errors.coupon}
                      helperText={errors?.coupon?.message}
                      variant="outlined"
                      placeholder="Enter coupon code"
                    />
                  )}
                />

                <Button color="primary" size="small"  className="!py-2 my-2 md:my-0" >
                  Apply Coupon
                </Button>
              </div>

              {/* Additional form fields can be added here */}
            </form>

            <CartTotals />
          </div>
        </div>
      )}
    </div>
  );
}
