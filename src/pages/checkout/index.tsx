import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
// import { placeOrder } from '../../store/orderSlice'
import { useAxios } from "@/hooks/useAxios";
import { useCart } from "@/contexts/CartProvider";
import { ShippingAddress, BillingAddress } from "@/api/UserAddress";
import RootLayout from "../layout";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Order = () => {
  const billingAddresses = useAxios("BILLING_ADDRESS", true);
  const shippingAddreses = useAxios("SHIPPING_ADDRESS", true);
  const placeOrder = useAxios("PLACE_ORDER");
  const router = useRouter();
  const {
    state: { cart, cartTotal },
    dispatch,
  } = useCart();
  console.log("🚀 ~ Order ~ cart:", cart);
  const methods = useForm({});
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/sign-in", {
        query: {
          from: "checkout",
        },
      });
    }
  }, [status]);

  if (status === "loading") return;
  return (
    <div className="md:px-16 px-3 my-3 md:my-12">
      <Typography variant="h6" fontWeight={700}>
        Checkout
      </Typography>
      <form
        onSubmit={methods.handleSubmit((data) => {
          console.log("form checkout data is", data);

          const totalProducts = cart.map((it: any) => ({
            quantity: it.quantity,
            productId: it.id,
          }));
          const params = {
            totalAmount: cartTotal,
            shopId: cart[0]?.shopId,
            billingAddressId: data.billingAddress,
            shippingAddressId: data.shippingAddress,
            shippingDetails: { name: "Flat Rate", price: 10.0 },
            orderItems: totalProducts,
            payment: {
              currency: "Dollar",
              status: "UNPAID",
              type: "COD",
            },
          };
          placeOrder.makeRequest(
            () => {
              toast.success("Order Placed Successfully");
              router.push("/");
              dispatch({
                type: "RESET",
              });
            },
            () => toast.error("Error While Placing Order"),
            { body: params }
          );
        })}
        // className="md:flex space-y-12 md:space-y-0 md:space-x-24 md:my-12 my-4 md:px-12 px-4"
        className="md:flex space-y-12 md:space-y-0 md:space-x-24 md:my-12 my-4 md:px-12 px-4"
      >
        <div className="flex md:w-2/3 w-full flex-col space-y-6">
          <FormControl>
            <FormLabel>Shipping Address</FormLabel>
            <Select
              {...methods.register("shippingAddress")}
              size="small"
              fullWidth
            >
              {shippingAddreses?.data?.result?.map((it: ShippingAddress) => (
                <MenuItem key={it.id} value={it.id}>
                  {it.addressLine1}{" "}
                </MenuItem>
              ))}
              {/* <MenuItem>Add New Shipping Address</MenuItem> */}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Billing Address</FormLabel>
            <Select
              {...methods.register("billingAddress")}
              size="small"
              fullWidth
            >
              {billingAddresses?.data?.result?.map((it: BillingAddress) => (
                <MenuItem key={it.id} value={it.id}>
                  {it.addressLine1}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="flex md:w-3/5 w-full flex-col space-y-6">
          <div className="space-y-4">
            {cart.map((item: any) => (
              <div key={item.id} className="flex w-full  space-x-4 px-3">
                <Image
                  alt={item.title}
                  src={item.image}
                  width={108}
                  height={108}
                  className="rounded-md"
                />

                <div className="w-full">
                  <Typography variant="subtitle1" fontWeight={500}>
                    {item.title}{" "}
                  </Typography>
                  <Typography variant="caption">
                    Quantity : {item.quantity}
                  </Typography>
                  <Box
                    mt={1.5}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography fontWeight={500} variant="body1">
                      Total : <small>$</small>
                      {item.price}
                    </Typography>
                    <IconButton size="small">
                      <FaTrash />
                    </IconButton>
                  </Box>
                </div>
              </div>
            ))}
            <div className="mt-12">
              <div className="flex w-full justify-between">
                <Typography className="!font-medium">Subtotal</Typography>
                <Typography className="" color="text.secondary">
                  ${cartTotal}
                </Typography>
              </div>
              <Divider
                variant="fullWidth"
                sx={{
                  borderBottomWidth: 2,
                  my: 1,
                }}
              />
              <div className="flex w-full justify-between">
                <Typography className="!font-medium">Shipping</Typography>
                <Typography color="text.secondary">Free</Typography>
              </div>
              <Divider
                variant="fullWidth"
                sx={{
                  borderBottomWidth: 2,
                  my: 1,
                }}
              />
              <div className="flex w-full justify-between">
                <Typography className="!font-medium">Total</Typography>
                <Typography className="" color="text.secondary">
                  ${cartTotal}
                </Typography>
              </div>
            </div>
            <FormControl>
              <FormLabel>Payment Method</FormLabel>
              <RadioGroup defaultValue="COD">
                <FormControlLabel
                  value="COD"
                  control={<Radio />}
                  label="Cash on Delivery"
                />
                <FormControlLabel
                  value="paypal"
                  control={<Radio />}
                  label="Paypal"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <Button type="submit" color="primary">
            Place Order
          </Button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

Order.getLayout = (page) => <RootLayout>{page}</RootLayout>;

export default Order;
