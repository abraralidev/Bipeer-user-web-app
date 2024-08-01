import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const HistoryCard = () => {
  return (
    <Card sx={{ display: "flex", width: 400, borderRadius: 2, m: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 150, borderRadius: 1 }}
        image="path_to_image.jpg" // replace with your image path
        alt="Profile Image"
      />
      <Box sx={{ display: "flex", flexDirection: "column", pl: 2 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="body1">
            Professional android apps for mobile in kotlin or java
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Status: Pending
          </Typography>
          <Typography variant="h5" component="div">
            250
          </Typography>
          <Typography variant="body2" color="textSecondary">
            @Victor Moreno
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default HistoryCard;
