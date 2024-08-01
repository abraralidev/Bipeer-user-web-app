import React from "react";
import RootLayout from "../../layout";
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
import { useSearchParams } from "next/navigation";

const ShopsByMall = () => {
  const router = useRouter();
  console.log("quesr param is", router.query);

  const shops = useAxios("SHOPS_BY_MallID", true, {
    params: {
      mallId: router.query.id,
    },
  });
  console.log("🚀 ~ index ~ shops:", shops);

  const handleCategoryClick = (categoryId: String) => {
    // Add your logic here for category click
    console.log("mall clicked:", categoryId);

    router.push({
      pathname: `/malls/shops-by-mall/${categoryId}`,
      query: {
        mallId: categoryId,
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
          Shops
        </Typography>
        {shops.isLoading ? (
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
            {shops?.data?.result && shops?.data?.result.length > 0 ? (
              <>
                {shops?.data?.result &&
                  shops.data.result.map((item) => (
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
              </>
            ) : (
              <>
                <Typography mt={"20px"} variant="h5" textAlign={"center"}>
                  No Shops Available
                </Typography>
              </>
            )}
          </Grid>
        )}
      </Box>
    </>
  );
};

ShopsByMall.getLayout = (page: React.ReactElement) => (
  <RootLayout>{page}</RootLayout>
);

export default ShopsByMall;
