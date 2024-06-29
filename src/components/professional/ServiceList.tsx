import React from "react";
import ServiceListCards from "./ServiceListCards";
import ServiceListFilters from "./ServiceListFilters";
import { Box, Grid } from "@mui/material";

const ServiceList = ({ professionals }) => {
  return (
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
        mt: "25px",
      }}
    >
      <Grid container spacing={2}>
        <Grid
          item
          sx={{
            display: { xs: "none", sm: "block" },
            marginLeft: {
              xs: "0", // No extra margin for extra small screens
              sm: "1rem", // Example for small screens
              md: "1rem", // Example for medium screens
              lg: "4rem", // Example for large screens
            },
            marginRight: {
              xs: "0", // No extra margin for extra small screens
              sm: "1rem", // Example for small screens
              md: "1rem", // Example for medium screens
              lg: "4rem", // Example for large screens
            },
          }}
          sm={3}
          md={2}
          lg={2}
        >
          <ServiceListFilters />
        </Grid>

        <Grid item xs={12} sm={8} md={8} lg={8}>
          <ServiceListCards professionals={professionals} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceList;
