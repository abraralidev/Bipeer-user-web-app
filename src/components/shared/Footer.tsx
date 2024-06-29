import React from "react";
import FooterHeading from "./FooterHeading";
import FooterText from "./FooterText";
import { IoSendSharp } from "react-icons/io5";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import Logo from "./Logo";
import { Button } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="grid bg-black   grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 md:px-44 pt-16 pb-12">
      <div>
        <Logo />
        <div className="mt-4">
          <FooterHeading title="Subscribe" />
          <div className="my-4">
            <FooterText title="Get 10% off your order" />
            <div className="border border-white rounded-lg w-[80%] flex items-center  space-x-3 px-6 py-3 mt-4">
              <input
                style={{ width: "70%" }}
                placeholder="Search"
                type="text"
                className="outline-none bg-[#000] text-white"
              />
              <Button sx={{ backgroundColor: "#ff000000" }}>
                <IoSendSharp fontSize={"22px"} color="white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <FooterHeading title="Support" />
        <div className="my-4 flex flex-col">
          <FooterText title="111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh." />
          <FooterText title="exclusive@gmail.com" />
          <FooterText title="+88015-88888-9999" />
        </div>
      </div> */}
      <div>
        <FooterHeading title="Account" />
        <div className="my-4 flex flex-col">
          <Link href={'/UserAccount'}>
          
          <FooterText title="My Account" />
          </Link>
          <Link href={'/auth/sign-in'}>
          
          <FooterText title="Login" />
          </Link>

          <Link href={'/auth/sign-up'}>
          
          <FooterText title="Register" />
          </Link>
          <Link href={'/cart'}>
          
          <FooterText title="Cart" />
          </Link>
          <Link href={"/ticket/CreateTicket"}>
            <FooterText title="Report an Issue" />
          </Link>
        </div>
      </div>
      <div>
        <FooterHeading title="Quick Link" />
        <div className="my-4 flex flex-col">
          <Link href={"/PrivacyPolicy"}>
            <FooterText title="Privacy Policy" />
          </Link>
          <Link href={"/TermsAndConditions"}>
            <FooterText title="Terms Of Use" />
          </Link>

          <Link href={"/Location-Shops"}>
            <FooterText title="Shops Near Me" />
          </Link>

          <Link
            href="/professional"
            className="text-white text-md my-1 font-light no-underline"
          >
            Pro
          </Link>

          {/* <FooterText title="Pro" /> */}
          <FooterText title="FAQ" />
        </div>
      </div>
      <div>
        <FooterHeading title="Download App" />
        <div className="my-4 flex flex-col">
          <FooterText title="Save $3 with App New User Only" />
          {/* <FooterText title="Terms Of Use" /> */}
          {/* <FooterText title="FAQ" /> */}
          <button>Continue With Play Store </button>
          <div className="flex items-center w-full justify-around  mt-4 space-x-3">
            <FaFacebook className="text-white text-xl" />
            <FaInstagram className="text-white text-xl" />
            <FaTwitter className="text-white text-xl" />
            <FaLinkedin className="text-white text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
