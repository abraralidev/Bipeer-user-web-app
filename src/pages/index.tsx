import HeroSection from "@/components/home/HeroSection";
import SaleBanner from "@/components/home/SaleBanner";
import BrandCarousel from "@/components/shared/BrandCarousel";
import BrandGridItems from "@/components/shared/BrandsGridItems";

import ProductsCarousel from "@/components/shared/ProductsCarousel";
import React, { useEffect } from "react";
import RootLayout from "./layout";
import { Box } from "@mui/material";

const Index = () => {
  // const { t } = initTranslations(locale, ["home"]);

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

Index.getLayout = (page: React.ReactElement) => <RootLayout>{page}</RootLayout>;

export default Index;
function initTranslations(arg0: string): { t: any } {
  throw new Error("Function not implemented.");
}
