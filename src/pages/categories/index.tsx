import React from "react";
import RootLayout from "../layout";
import { useAxios } from "@/hooks/useAxios";
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
  const categories = useAxios("CATEGORIES", true);
  console.log("🚀 ~ index ~ categories: in index cat page ****", categories);
  const router = useRouter();

  const handleCategoryClick = (categoryId) => {
    // Add your logic here for category click
    console.log("Category clicked:", categoryId);

    router.push({
      pathname: "/products/product-filter",
      query: {
        //   query: data.product_name ?? "",
        category: categoryId ?? "",
      },
    });
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
          All Categories
        </Typography>
        {categories.isLoading ? (
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
          <Grid container spacing={4}>
            {categories?.data?.result &&
              categories.data.result.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                  <Accordion
                    sx={{
                      "&.MuiAccordion-root": {
                        boxShadow: "none",
                      },
                    }}
                  >
                    <AccordionSummary
                      aria-controls={`${item.id}-content`}
                      id={`${item.id}-header`}
                      sx={{ width: "100%", padding: "0" }}
                    >
                      <Card
                        sx={{
                          maxWidth: 345,
                          width: "100%",
                          position: "relative",
                          borderRadius: "35px",
                          boxShadow: "none",
                        }}
                      >
                        <CardMedia
                          component="img"
                          alt={item.name}
                          height="200"
                          image={item.image}
                          sx={{
                            borderRadius: "35px",
                          }}
                        />
                        <CardContent
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            color: "white",
                            background:
                              "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
                            width: "100%",
                            textAlign: "center",
                            padding: "8px !important", // Remove default padding
                          }}
                        >
                          <Typography
                            variant="h6"
                            fontWeight={"600"}
                            className="cursor-pointer"
                            onClick={() => {
                              router.push({
                                pathname: "/products/product-filter",
                                query: {
                                  // query: data.product_name ?? "",
                                  category: item.id ?? "",
                                },
                              });
                            }}
                          >
                            {item.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </AccordionSummary>
                    {/* <AccordionDetails
                      sx={{
                        border: "1px solid #00000024",
                        borderRadius: "10px",
                      }}
                    >
                      {item.SubCategory && item.SubCategory.length > 0 ? (
                        <Box
                          mt={2}
                          sx={{
                            width: "100%",
                          }}
                        >
                          {item.SubCategory.map((subItem) => (
                            <Typography
                              key={subItem.id}
                              sx={{ cursor: "pointer", mt: 1 }}
                            >
                              {subItem.name}
                            </Typography>
                          ))}
                        </Box>
                      ) : (
                        <Typography mt={2} sx={{ width: "100%" }}>
                          No Sub Category Available
                        </Typography>
                      )}
                    </AccordionDetails> */}
                  </Accordion>
                </Grid>
              ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

Index.getLayout = (page: React.ReactElement) => <RootLayout>{page}</RootLayout>;

export default Index;
