import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";

function EmptyCart() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-4">
      <div className="w-full max-w-3xl text-center">
        <div>
          <Typography
            variant="h1"
            className="mt-4 sm:mt-6 text-4xl md:text-7xl font-extrabold tracking-tight leading-tight md:leading-none text-center"
          >
            Empty . . .
          </Typography>
        </div>

        <div>
          <Typography
            variant="h5"
            color="text.secondary"
            className="mt-2 text-lg md:text-xl font-medium tracking-tight text-center"
          >
            There are no products Here.
          </Typography>
        </div>

        <Link className="block font-normal mt-4" href="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default EmptyCart;
