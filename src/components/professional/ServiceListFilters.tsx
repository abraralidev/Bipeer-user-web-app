import { categoryData } from "@/api/Category";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LocationList from "./LocationList";
import { useAxios } from "@/hooks/useAxios";
import { useRouter } from "next/router";

const ServiceListFilters = () => {
  const [rangeVal, setRangeVal] = useState<number[]>([0, 1000]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setRangeVal(newValue as number[]);
  };

  const categories = useAxios("CATEGORIES_OF_PROFESSIONALS", true);
  console.log(categories);

  const router = useRouter()

  let handleCategoryClick = (id:any) =>{
    router.push({
      pathname: "/professional/professional-filter",
      query: {
      //   query: data.product_name ?? "",
      mainCategory: id ?? "",
      },
    });
  }
  let handleSubCategoryClick = (id:any) =>{
    router.push({
      pathname: "/professional/professional-filter",
      query: {
      //   query: data.product_name ?? "",
      subCategory: id ?? "",
      },
    });
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between ">
        <Typography fontSize={18} fontWeight={600}>
          Filters
        </Typography>
        <Button variant="text" color="inherit">
          View All
        </Button>
      </div>
      <Divider variant="fullWidth" />
      <div className="mt-2">
        <Typography fontSize={16} gutterBottom fontWeight={600}>
          Categories
        </Typography>
        <List
          sx={{
            "& .css-h4y409-MuiList-root": {
              padding: 0,
            },
          }}
        >
          {categories?.data?.categories?.map((category) => (
            <React.Fragment key={category.id}>
              <ListItem className="cursor-pointer" disablePadding onClick={() => handleCategoryClick(category.id)}>
                <ListItemText secondary={category.name} />
              </ListItem>
              {category.ProfessionalSubCategory &&
                category.ProfessionalSubCategory.length > 0 && (
                  <List component="div" disablePadding>
                    {category.ProfessionalSubCategory.map((subcategory) => (
                      <ListItem
                        className="cursor-pointer"
                        key={subcategory.id}
                        sx={{ pl: 4 }}
                        disablePadding
                        onClick={() => handleSubCategoryClick(subcategory.id)}
                      >
                        <ListItemText secondary={subcategory.name} />
                      </ListItem>
                    ))}
                  </List>
                )}
            </React.Fragment>
          ))}
        </List>
      </div>
      <div className="mt-2">
        <Typography fontSize={16} gutterBottom fontWeight={600}>
          Price Range
        </Typography>
        <Slider
          getAriaLabel={() => "Price Range"}
          value={rangeVal}
          onChange={handleChange}
          max={1000}
          valueLabelDisplay="auto"
          // getAriaValueText={valuetext}
        />
      </div>
      <div className="mt-2">
        <Typography fontSize={16} gutterBottom fontWeight={600}>
          Location
        </Typography>
        <LocationList />
      </div>
    </div>
  );
};

export default ServiceListFilters;
