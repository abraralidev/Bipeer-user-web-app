import HeroSection from "@/components/home/HeroSection";
import SaleBanner from "@/components/home/SaleBanner";
import BrandCarousel from "@/components/shared/BrandCarousel";
import BrandGridItems from "@/components/shared/BrandsGridItems";

import ProductsCarousel from "@/components/shared/ProductsCarousel";
import React, { useEffect } from "react";
import RootLayout from "./layout";
import { Box } from "@mui/material";

import { collection, addDoc } from "firebase/firestore";

const index = () => {


  return (
    <>
      <Box
        sx={{ px: { md: "9rem", sm: "1rem" } }}

        // style={{ paddingLeft: "14rem", paddingRight: "14rem" }}
      >
        <HeroSection />
        <div>
          <ProductsCarousel title="Internet Base" />
          <SaleBanner />
          <BrandCarousel title="All Stores" />
          <ProductsCarousel title="Internet Base" />
          {/* <BrandGridItems title='All Stores' /> */}
        </div>
      </Box>
    </>
  );
};

index.getLayout = (page: React.ReactElement) => <RootLayout>{page}</RootLayout>;

export default index;
