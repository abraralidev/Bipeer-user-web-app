import React from "react";

type FooterHeadingType = {
  title: string;
}

const FooterHeading = ({ title }: FooterHeadingType) => {
  return <p className="text-lg text-white  mb-4">{title} </p>;
};

export default FooterHeading;
