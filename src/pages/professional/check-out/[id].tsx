import React, { useEffect, useState } from "react";
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
import ProfessionalLayout from "../layout";
import ProfessionalReview from "@/components/professional/ProfessionalReview";
import { useAxios } from "@/hooks/useAxios";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { FaPaypal } from "react-icons/fa";
import { toast } from "react-toastify";

const currencyVal = "$";

export default function ProductDetails() {
  // const [service, setValue] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [fetchedService, setfetchedService] = useState({});

  const router = useRouter();
  const params = useParams();
  const serviceID = params?.id;
  const { makeRequest: getServiceReviews } = useAxios("GET_SERVICE_REVIEWS");
  const { makeRequest: getService } = useAxios("GET_SERVICE_BY_ID");
  const { makeRequest: creatServiceOrder } = useAxios("CREATE_SERVICE_ORDER");

  useEffect(() => {
    getServiceReviews(
      (res) => {
        console.log(res.result?.ServiceRating);
        setReviews(res.result?.ServiceRating);
      },
      (err) => {
        console.log(err);
      },
      {
        params: {
          id: String(serviceID),
        },
      }
    );
    getService(
      (res) => {
        console.log("our fetched service is", res);
        setfetchedService(res?.service);
      },
      (err) => {
        console.log(err);
      },
      {
        params: {
          id: String(serviceID),
        },
      }
    );
    getService();
    getServiceReviews();
  }, [serviceID]);
  return (
    <div className=" my-4 md:px-44 px-3">
      <Box textAlign={"center"} my={"3rem"}>
        <Typography variant="h2">Order Summary</Typography>
      </Box>
      <Grid container mb={3}>
        <Grid
          className={"yooooooooooooo"}
          spacing={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          item
          md={6}
        >
          <Grid container>
            <Grid item md={12} mr={2}>
              <Image
                src={fetchedService?.image}
                alt="name"
                width={960}
                height={900}
                className="col-span-3 rounded-xl"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item ml={3} md={5}>
          <Typography pl={2} fontSize={"25px"} fontWeight={"800"} gutterBottom>
            {fetchedService?.title === ""
              ? "No Title available for this service 99999"
              : fetchedService?.title}
          </Typography>

          <Box display={"flex"}>
            <Rating
              name="simple-controlled"
              value={fetchedService?.rating}
              readOnly
            />
            <Typography>({fetchedService?.rating})</Typography>
          </Box>

          <Typography variant="h6" pl={2} fontWeight={400} mt={2} gutterBottom>
            $ {fetchedService?.price}
          </Typography>

          <Typography pl={2} mt={2}>
            {fetchedService?.description === ""
              ? "no description available for this service 99999"
              : fetchedService?.description}
          </Typography>

          <Box mt={"20px"}>
            <Typography fontSize={"1.7rem"}>Payment Methods</Typography>
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
                backgroundColor: "#293cc9",
                borderRadius: "25px",
              }}
              onClick={() => {
                router.push(`/profesional/checkout/${serviceID}`);
              }}
            >
              <FaPaypal />
            </Button>
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
                onClick={() => {
                  //   toast.success("Booked Service Successfully");
                  //   toast("hello");
                  creatServiceOrder(
                    (res) => {
                      if (res) {
                        toast.success("Booked Service Successfully");
                        router.push(`/professional/${serviceID}`);
                      }
                    },
                    (err) => {
                      console.log(err);
                      toast.error("something Went Wrong");
                    },
                    {
                      body: {
                        totalAmount: fetchedService?.price,
                        serviceId: serviceID,
                        payment: {
                          currency: "Dollar",
                          status: "UNPAID",
                          type: "COD",
                        },
                      },
                    }
                  );
                }}
              >
                Check Out
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <ProfessionalReview reviews={reviews} />

      {/* <SelectedGigs title="Related Services" /> */}
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
