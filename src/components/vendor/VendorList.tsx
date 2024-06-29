import React from "react";
import ServiceListCards from "../professional/ServiceListCards";
import ServiceListFilters from "../professional/ServiceListFilters";
import { Box, Grid } from "@mui/material";
import VendorListFilter from "./VendorListFilter";
import VendorListCards from "./VendorListCards";

const VendorList = ({vendors}) => {
  return (
    <>
      <Box
        sx={{
          paddingLeft: {
            xs: "0.5rem", // Example for extra small screens
            sm: "1rem", // Example for small screens
            md: "1rem", // For medium screens
            lg: "4rem", // For large screens
          },
          paddingRight: {
            xs: "0.5rem", // Example for extra small screens
            sm: "1rem", // Example for small screens
            md: "1rem", // For medium screens
            lg: "4rem", // For large screens
          },
          mt:'25px'
        }}
      >
        <Grid container>
          <Grid item sx={{display:{xs:'none',sm:'block'}}} md={2} lg={2}>
            <VendorListFilter />
          </Grid>

          <Grid item xs={12} sm={9} md={10} lg={10}>
            <Grid container>
              <Grid item>
                <VendorListCards vendors={vendors} />{" "}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default VendorList;
