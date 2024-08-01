import React from "react";
import { Box, Button, Drawer, Grid, Typography } from "@mui/material";
import ProductsListFilters from "./ProductsFilter";
import ProductsCards from "./ProductCards";

const ProductList = ({ products }) => {
  const [open, setOpen] = React.useState(false);

  console.log("products in list are", products);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const filters = (
    <Box>
      <ProductsListFilters />
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          paddingX: {
            xs: "0.5rem",
            sm: "1rem",
            lg: "4rem",
          },
          marginTop: "25px",
        }}
      >
        <Button
          className="block md:hidden"
          onClick={toggleDrawer}
          variant="contained"
          color="primary"
        >
          Filters
        </Button>
        <Drawer open={open} onClose={toggleDrawer}>
          {filters}
        </Drawer>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box display={{ xs: "none", md: "block" }}>{filters}</Box>
          </Grid>
          <Grid item xs={12} md={9}>
            {products && products?.length === 0 && (
              <Typography align="center" variant="h6">
                There are no Products
              </Typography>
            )}
            {products && products.products?.length !== 0 ? (
              <ProductsCards products={products} />
            ) : (
              <Typography align="center" variant="h6">
                There are no Products
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductList;
