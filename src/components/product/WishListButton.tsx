import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";

const WishListButton = () => {
  const [isWishlist, setIsWishlist] = useState(false);
  return (
    <div
      onClick={() => setIsWishlist((prev) => !prev)}
      className={`border cursor-pointer transition-colors rounded-md px-4 py-2 ${
        isWishlist ? "bg-[#DB4444] text-white " : ""
      } `}
    >
      <CiHeart className="text-2xl" />
    </div>
  );
};

export default WishListButton;
