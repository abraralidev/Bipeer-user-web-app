import { Service } from "@/api/Services";
import { useAxios } from "@/hooks/useAxios";
import React from "react";
import VendorCard from "./VendorCard";

const VendorListCards = ({vendors}) => {
  let services = []
  if(vendors !== null){
    console.log('we got vendors by search');
     services = vendors.result
     console.log('vendors by search are', vendors);
     
  }else {
    console.log('services with no filter vendor');
    
     services = useAxios("SHOPS", true);
     services = services.data?.result
      console.log('services',services)
  }
;
  
  return (
<div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
  {services?.map((service: Service) => (
    <VendorCard key={service.id} service={service} />
  ))}
</div>

  );
};

export default VendorListCards;
