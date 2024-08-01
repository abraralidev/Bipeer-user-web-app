import React from "react";
import RootLayout from "../layout";
import { useAxios } from "@/hooks/useAxios";
import {
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
  const malls = useAxios("MALLS", true);
  console.log("🚀 ~ index ~ malls:", malls);
  const router = useRouter();

  const handleCategoryClick = (categoryId: String) => {
    // Add your logic here for category click
    console.log("mall clicked:", categoryId);

    router.push({
      pathname: `/malls/shops-by-mall/${categoryId}`,
      // query: {
      //   //   query: data.product_name ?? "",
      //   category: categoryId ?? "",
      // },
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
          MALLS
        </Typography>
        {malls.isLoading ? (
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
            {malls?.data?.result &&
              malls.data.result.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      maxWidth: 345,
                      position: "relative",
                      borderRadius: "35px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={item.name}
                      height="200"
                      image={item.image}
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
                      }}
                    >
                      <Typography
                        variant="h6"
                        onClick={() => {
                          handleCategoryClick(item.id);
                        }}
                        fontWeight={"600"}
                        className="cursor-pointer"
                      >
                        {item.name}
                      </Typography>
                    </CardContent>
                  </Card>
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
