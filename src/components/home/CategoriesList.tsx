import { Category } from "@/api/Category";
import { useAxios } from "@/hooks/useAxios";
import { Typography } from "@mui/material";
import React from "react";
import LoadingList from "../shared/LoadingList";

const CategoriesList = () => {
  const categories = useAxios("CATEGORIES", true);
  return (
    <div className="md:w-1/4  border-r h-full space-y-3 pr-4 pt-16 border-r-gray-300 md:flex hidden flex-col">
      {categories.isLoading ? <LoadingList /> : categories.data.result?.slice(0, 8)?.map((category: Category) => (
        <div key={category.id} className="w-full transition-all hover:font-semibold hover:scale-105 cursor-pointer">
          <Typography >
            {category.name}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default CategoriesList;
