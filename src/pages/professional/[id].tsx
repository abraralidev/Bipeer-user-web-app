import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Rating,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import Image from "next/image";
import SelectedGigs from "@/components/professional/SelectedGigs";
import ProfessionalLayout from "./layout";

const currencyVal = "$";

export default function ProductDetails() {
  const [value, setValue] = useState(0);
  return (
    <div className=" my-4 md:px-44 px-3">
      <Grid  container mb={3} >
        <Grid className={'yooooooooooooo'} spacing={2} display={'flex'} justifyContent={'center'} alignItems={'center'} item md={6}>
          <Grid container>
            {/* <Grid item md={3}>
              <div className="space-y-2">
                <Image
                  className="rounded-xl"
                  alt="http://res.cloudinary.com/hnmyc0yl8/image/upload/v1716121083/1716121082540.webp"
                  src={
                    "http://res.cloudinary.com/hnmyc0yl8/image/upload/v1716121083/1716121082540.webp"
                  }
                  height={320}
                  width={320}
                />
                <Image
                  className="rounded-xl"
                  alt="http://res.cloudinary.com/hnmyc0yl8/image/upload/v1716121083/1716121082540.webp"
                  src={
                    "http://res.cloudinary.com/hnmyc0yl8/image/upload/v1716121083/1716121082540.webp"
                  }
                  height={320}
                  width={320}
                />
                <Image
                  className="rounded-xl"
                  alt="http://res.cloudinary.com/hnmyc0yl8/image/upload/v1716121083/1716121082540.webp"
                  src={
                    "http://res.cloudinary.com/hnmyc0yl8/image/upload/v1716121083/1716121082540.webp"
                  }
                  height={320}
                  width={320}
                />
              </div>
            </Grid> */}
            <Grid item md={12} mr={2}>
              <Image
                src={
                  "http://res.cloudinary.com/hnmyc0yl8/image/upload/v1716121083/1716121082540.webp"
                }
                alt="name"
                width={960}
                height={900}
                className="col-span-3 rounded-xl"
              />
            </Grid>

            {/* <div className="space-y-2">
              <Image
                className="rounded-xl"
                alt="http://res.cloudinary.com/hnmyc0yl8/image/upload/v1716121083/1716121082540.webp"
                src={
                  "http://res.cloudinary.com/hnmyc0yl8/image/upload/v1716121083/1716121082540.webp"
                }
                height={320}
                width={320}
              />
              <Image
                className="rounded-xl"
                alt="http://res.cloudinary.com/hnmyc0yl8/image/upload/v1716121083/1716121082540.webp"
                src={
                  "http://res.cloudinary.com/hnmyc0yl8/image/upload/v1716121083/1716121082540.webp"
                }
                height={320}
                width={320}
              />
              <Image
                className="rounded-xl"
                alt="http://res.cloudinary.com/hnmyc0yl8/image/upload/v1716121083/1716121082540.webp"
                src={
                  "http://res.cloudinary.com/hnmyc0yl8/image/upload/v1716121083/1716121082540.webp"
                }
                height={320}
                width={320}
              />
            </div> */}
          </Grid>
        </Grid>

        <Grid item ml={3} md={5}>
          <Typography pl={2} fontSize={"25px"} fontWeight={"800"} gutterBottom>
            Do a professional UI UX audit of your website
          </Typography>

          <Box display={"flex"}>
            <Rating
              name="half-rating"
              sx={{ paddingLeft: "13px" }}
              defaultValue={2.5}
              precision={0.5}
            />
            <Typography>(3.5/5)</Typography>
          </Box>

          <Typography variant="h6" pl={2} fontWeight={400} mt={2} gutterBottom>
            $ 5000
          </Typography>

          <Typography pl={2} mt={2}>
            This graphic t-shirt which is perfect for any occasion. Crafted from
            a soft and breathable fabric, it offers superior comfort and style.
          </Typography>

          <Box pl={2} mt={2} pt={2} sx={{ borderTop: "1px solid #00000026" }}>
            <Typography>Choose options</Typography>
            <Box mt={1}>
              <Button
                sx={{
                  background: "#F0F0F0",
                  color: "black",
                  // border:'1px solid #00000026',
                  borderRadius: "25px",
                  mx: "5px",
                }}
                color="primary"
                variant="text"
              >
                option 1
              </Button>
              <Button
                sx={{
                  background: "#F0F0F0",
                  color: "black",
                  // border:'1px solid #00000026',
                  borderRadius: "25px",
                  mx: "5px",
                }}
                color="primary"
                variant="text"
              >
                option 2
              </Button>
              <Button
                sx={{
                  background: "#F0F0F0",
                  color: "black",
                  // border:'1px solid #00000026',
                  borderRadius: "25px",
                  mx: "5px",
                }}
                color="primary"
                variant="text"
              >
                option 3
              </Button>
            </Box>
          </Box>

          <Box
            pl={2}
            display={"flex"}
            mt={2}
            pt={2}
            sx={{ borderTop: "1px solid #00000026" }}
            gap={2}
          >
            <Box>
              <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button>-</Button>
                <Button>1</Button>
                <Button>+</Button>
              </ButtonGroup>
            </Box>
            <Box>
              <Button
                variant="outlined"
                size="medium"
                sx={{
                  px: {
                    md: "5rem",
                    xs: 2,
                    sm: 0.5,
                  },
                  py: {
                    md: 1,
                    xs: 1,
                    sm: 0.5,
                  },
                  backgroundColor: "#2D005E",
                  borderRadius: "25px",
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* <Typography variant="h5" mt={2} gutterBottom>
        Do a professional UI UX audit of your website
      </Typography>
      <Typography variant="h6" fontWeight={400} mt={2} gutterBottom>
        $ 5000
      </Typography> */}
      {/* <div className="flex items-center space-x-4">
        <Button
          variant="contained"
          size="medium"
          sx={{
            px: {
              md: 2,
              xs: 2,
              sm: 0.5,
            },
            py: {
              md: 2,
              xs: 1,
              sm: 0.5,
            },
            backgroundColor: "#2D005E", // Background color applied uniformly
          }}
        >
          Buy Now
        </Button>
        <Button
          variant="contained"
          size="medium"
          sx={{
            px: {
              md: 2,
              xs: 2,
              sm: 0.5,
            },
            py: {
              md: 2,
              xs: 1,
              sm: 0.5,
            },
            backgroundColor: "#2D005E", // Background color applied uniformly
          }}
        >
          Add to Cart
        </Button>
      </div> */}
      

      <SelectedGigs title="Related Services" />
    </div>
  );
}

ProductDetails.getLayout = (page: React.ReactElement) => (
  <ProfessionalLayout>{page}</ProfessionalLayout>
);

// export const getServerSideProps: GetServerSideProps<{ product: Service }> = async (context) => {
//     const serviceId = context.params?.id as string || "";
//     try {
//         const vendorRes = await axiosInstance.get(`https://listing-backend-z4i5.onrender.com/user/getVendors?id=${vendorId}`)
//         const productRes = await axiosInstance.get(`https://listing-backend-z4i5.onrender.com/product/getall`);
//         const productVendor = await axiosInstance.get(`https://listing-backend-z4i5.onrender.com/product/getAllByVendor/${vendorId}`);
//         const products = productRes.data.products;
//         const vendorProducts = productVendor.data.products
//         const vendor = vendorRes.data.vendors?.[0];
//         if (!vendor) {
//             return {
//                 notFound: true,
//             };
//         }

//         return {
//             props: {
//                 products: products ?? [],
//                 vendor,
//                 vendorProducts: vendorProducts
//             }
//         };
//     } catch (_) {
//         return {
//             notFound: true,
//         };
//     }
// };
