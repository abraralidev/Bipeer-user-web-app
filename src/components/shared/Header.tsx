import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { CiLocationOn } from "react-icons/ci";

const Header = () => {
  const router = useRouter();
  return (
    <div className=" border-b-gray-700 md:flex hidden px-44 md:pl-[2rem] md:pr-[6rem]   lg:pl-[11rem] lg:pr-[11rem] items-center py-1 justify-between ">
      <div className="flex items-center space-x-6">
        <span className="text-xs font-medium">
          Hi{" "}
          <Link className="text-blue-700 underline" href="/auth/sign-in">
            Login
          </Link>{" "}
          or{" "}
          <Link className="text-blue-700 underline" href="/auth/sign-up">
            register
          </Link>
        </span>
        <Link href="/chat" className="text-xs font-medium hover:underline">
          Chat
        </Link>
        <Link href="/" className="text-xs font-medium hover:underline">
          Help & Contact
        </Link>
        <Link
          href="/professional"
          className="text-xs font-medium hover:underline"
        >
          PRO
        </Link>
      </div>
      <div className="flex space-x-6 items-center">
        <a
          href="https://listing-admin.netlify.app/signup/professionaladmin"
          target="_blank"
          className="text-xs font-medium hover:underline"
        >
          Become a Professional
        </a>
        <a
          href="https://listing-admin.netlify.app/signup/vendoradmin"
          target="_blank"
          className="text-xs font-medium hover:underline"
        >
          Become a Vendor
        </a>
      </div>
    </div>
  );
};

export default Header;
