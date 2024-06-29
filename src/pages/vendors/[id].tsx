import { axiosInstance } from "@/api/axios";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { GetServerSideProps } from "next";
import { Product } from "@/api/Product";

import ProductsCarousel from "@/components/shared/ProductsCarousel";
import VendorProductCarousel from "@/components/vendor/ProductsCarousel";
import Image from "next/image";
import RootLayout from "../layout";
import { Vendor } from "@/api/User";
import BrandDisplayCard from "@/components/shared/BrandDisplayCard";
import { Grid, ListItem, ListItemText, Typography } from "@mui/material";
import { useAxios } from "@/hooks/useAxios";

export default function VendorDetails({
  vendor,
  vendorProducts,
}: {
  vendor: Vendor;
  vendorProducts: Product[];
}) 


{
    const categories = useAxios("CATEGORY_BY_VENDOR", true);
    console.log(categories);
    
  return (
    <div>
      <div className="mb-8">
        <BrandDisplayCard brand={vendor} />
      </div>
      <div className="md:mx-16 my-2 md:my-12">
        <Grid container>
          {/* <Grid item xs={12} sm={3}>
            <Typography>
               Shop Categories
            </Typography>
            {categories && categories?.data?.categories?.map(category => (
                        <ListItem className='cursor-pointer' key={category.id} disablePadding>
                            <ListItemText secondary={category.name} />
                        </ListItem>
                    ))}
          </Grid> */}
          <Grid item xs={12} sm={12} display={'flex'} justifyContent={'center'}>
            <VendorProductCarousel
              products={vendorProducts}
              title={`Products By ${vendor.name}`}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

VendorDetails.propTypes = {
  productData: PropTypes.object,
};

VendorDetails.getLayout = (page: React.ReactElement) => (
  <RootLayout>{page}</RootLayout>
);

export const getServerSideProps: GetServerSideProps<{
  vendor: Vendor;
  vendorProducts: Product[];
}> = async (context) => {
  const vendorId = (context.params?.id as string) || "";
  try {
    const vendorRes = await axiosInstance.get(
      `https://listing-backend-z4i5.onrender.com/user/getVendors?id=${vendorId}`
    );
    const productVendor = await axiosInstance.get(
      `https://listing-backend-z4i5.onrender.com/product/getAllByVendor/${vendorId}`
    );
    const vendorProducts = productVendor.data.products;
    const vendor = vendorRes.data.vendors?.[0];
    if (!vendor) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        vendor,
        vendorProducts: vendorProducts,
      },
    };
  } catch (_) {
    return {
      notFound: true,
    };
  }
};
