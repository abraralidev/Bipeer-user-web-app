import React from "react";
import RootLayout from "../layout";
import { useAxios } from "@/hooks/useAxios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

const Index = () => {
  const { data } = useAxios("CURRENT_PROFILE", true);
  console.log("🚀 ~ Index ~ data: user is", data?.customer);

  const points = useAxios("GET_CITIES", true, {}, [data?.customer?.cityId]);

  console.log("🚀 ~ index ~ points: poi *******", points);
  const router = useRouter();

  const handleCategoryClick = (categoryId: String) => {
    // Add your logic here for category click
    // router.push({
    //   pathname: "/products/product-filter",
    //   query: {
    //     //   query: data.product_name ?? "",
    //     category: categoryId ?? "",
    //   },
    // });
  };

  return (
    <>
      <Box
        sx={{
          px: { sm: "2rem", md: "6rem" },
          my: "3rem",
        }}
      >
        <Typography variant="h2" mb={"1rem"} textAlign={"center"}>
          City Areas
        </Typography>
        {points.isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "65vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <div>
            {points?.data?.cities?.length > 0 &&
              points?.data?.cities.map((item, index) => (
                <>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{item.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {item.CityArea && item.CityArea?.length > 0 ? (
                        item.CityArea.map((subItem) => (
                          <Typography
                            my={"20px"}
                            key={subItem.id}
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                              router.push({
                                pathname: "/products/product-filter",
                                query: {
                                  cityAreaId: subItem.id ?? "",
                                  query: data.product_name ?? "",
                                  category: data.category ?? "",
                                },
                              });
                            }}
                          >
                            {subItem.name}
                          </Typography>
                        ))
                      ) : (
                        <Typography my={"20px"}>
                          No City Area Available
                        </Typography>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </>
              ))}
          </div>
        )}
      </Box>
    </>
  );
};

Index.getLayout = (page: React.ReactElement) => <RootLayout>{page}</RootLayout>;

export default Index;
