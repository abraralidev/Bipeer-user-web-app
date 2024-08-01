import React from "react";
import * as yup from "yup";
import { Button, TextField, Typography } from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CartTotals } from "../../components/cart/CartTotals";
import EmptyCart from "../../components/cart/EmptyCart";
import { MdCancel, MdDelete } from "react-icons/md";
import { useCart } from "@/contexts/CartProvider";
import Image from "next/image";
import RootLayout from "../layout";
import { useFavorites } from "@/contexts/FavouritesProvider";

const schema = yup.object().shape({
  coupon: yup.string(),
});

const defaultValues = {
  coupon: "",
};

export default function Index() {
  const {
    state: { favorites },
    dispatch,
  } = useFavorites();
  console.log("🚀 ~ Index ~ favorites:", favorites);

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
      {favorites.length === 0 ? (
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
            Favourites
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
            {/* <div className=" p-1 w-full cursor-pointer ">
              <Typography className="  !font-bold text-center">
                Quantity
              </Typography>
            </div> */}
            {/* <div className="p-1 w-full cursor-pointer ">
              <Typography className="  !font-bold text-center">
                Subtotal
              </Typography>
            </div> */}
            <div className="p-1 w-full cursor-pointer ">
              <Typography className="  !font-bold text-center">
                Delete
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
                    <Button
                      onClick={() => {
                        // dispatch(incrementCartQuantity(item.id));
                        dispatch({
                          type: "REMOVE_FROM_FAVORITES",
                          payload: item.id,
                        });
                      }}
                    >
                      <MdDelete />
                    </Button>
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
}

Index.getLayout = (page: React.ReactElement) => <RootLayout>{page}</RootLayout>;
