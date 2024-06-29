import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    // <h6>Logo</h6>
    <Link href='/'><Image src={'/assets/images/main_logo.png'} alt="logo" className="min-h-8 min-w-8" width={56} height={56} /></Link>
  );
};

export default Logo;
