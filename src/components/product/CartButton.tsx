import { Product } from "@/api/Product";
import { useCart } from "@/contexts/CartProvider";
import { useParams } from "next/navigation";
import React from "react";

const CartButton = ({ product }: { product: Product }) => {
  const { id } = useParams<{ id: string }>();
  const { state: { cart, quantity }, dispatch } = useCart()
  return (
    <div>
      {" "}
      <div className="flex w-full items-center space-x-6">
        <div className="border border-black flex" style={{ borderRadius: "5px" }}>
          <div
            className="border-r p-2 px-4 cursor-pointer"
            onClick={() => {
              dispatch({
                type: 'DECREMENT_QUANTITY'
              });
            }}
          >
            <p>-</p>
          </div>
          <div className="border-r p-2 px-4 cursor-pointer">
            <p>{quantity}</p>
          </div>
          <div
            className="p-2 bg-[#DB4444] text-white px-4 cursor-pointer"
            onClick={() => {
              dispatch({
                type: "INCREMENT_QUANTITY"
              });
            }}
          >
            +
          </div>
        </div>
        <button
          className="bg-[#DB4444] text-white md:px-8 px-2 py-2 rounded-lg "
          disabled={quantity < 1}
          onClick={() => {
            dispatch({
              type: "UPDATE_CART_SUBTOTAL", payload: product?.discountedPrice
                ? quantity * product.discountedPrice
                : quantity * product.price
            })

            dispatch({
              type: "UPDATE_CART", payload: {
                id: id,
                quantity: quantity,
                price: product?.discountedPrice
                  ? product.discountedPrice
                  : product.price,
                title: product?.name,
                image: product.mainImage,
                subtotal: product?.discountedPrice
                  ? quantity * product.discountedPrice
                  : quantity * product.price,
                shopId: product?.Shop?.id

              }
            })

            dispatch({
              type: "UPDATE_CART_TOTAL"
            })
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CartButton;
