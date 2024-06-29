import { Category } from "@/api/Category";
import { useAxios } from "@/hooks/useAxios";
import { relative } from "path";
import React from "react";
import { useFormContext } from "react-hook-form";

const CategoriesField = ({ }) => {
  const categories = useAxios("CATEGORIES", true);

  return (
    <select
    //   {...register("category")}
      className="md:pl-[9px]  border-l md:w-auto w-full border-l-gray-400 focus:outline-none  cursor-point "
     
    >
      <option>All Categories</option>
      {categories.data?.result?.map((category: Category) => (
        <option key={category.id} value={category.id}>
          {category.name}{" "}
        </option>
      ))}
    </select>
  );
};

export default CategoriesField;
