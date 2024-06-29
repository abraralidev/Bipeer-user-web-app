import React from "react";
import { useAxios } from "@/hooks/useAxios";
import { Vendor } from "@/api/User";
import BrandCard from "./BrandCard";
import LoadingCards from "./LoadingCards";

type BrandGridItemsProps = {
    title: string;
}

const BrandGridItems = ({ title }: BrandGridItemsProps) => {
    const vendors = useAxios("VENDORS", true)
    return (
        <div className="my-16 w-full">
            <h6 className="text-2xl font-medium mb-6">{title}</h6>
            {vendors.isLoading ? <LoadingCards /> :
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {vendors.data?.vendors?.map((item: Vendor) => (
                        <BrandCard brand={item} key={item.id} />
                    ))}
                </div>
            }
        </div>
    );
};

export default BrandGridItems;
