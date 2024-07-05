import { Box } from "@mui/material";
import React, { useState } from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProductReviewCarousel from "../product/ProductReviewCarousel";

const VendorReviews = ({reviews} : any) => {
  const [value, setValue] = useState("1"); // Initial value should match the value of the default TabPanel

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box className="mt-5">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Description" value="1" />
              <Tab label="FAQs" value="2" />
              <Tab label="Reviews" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">Product Description</TabPanel>
          <TabPanel value="2">PRODUCT FAQs</TabPanel>
          <TabPanel value="3">
            <ProductReviewCarousel reviews={reviews} title={"Reviews"}/>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default VendorReviews;
