import { Service } from "@/api/Services";
import { useAxios } from "@/hooks/useAxios";
import React, { useState } from "react";
import SelectedGigCard from "./SelectedGigCard";
import SelectedGigCard2 from "./selectedGigCard2";

const ServiceListCards = ({professionals}) => {
const [searched, setsearched] = useState(false)
  let services = []
  console.log('pros are ' , professionals);
 
  if(professionals){
    
  console.log('pros from above');
  
    services = professionals?.result
    console.log('single pro is', services);
    
  }else{
    console.log('all pros');
    services = useAxios("GET_SERVICES", true);
    services = services.data.services
    console.log('all pros are ' , services);
   
  }
  return (
<div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
{services?.map((service: Service) => (
      <SelectedGigCard key={service.id} service={service} />
    ))}


  
</div>

  );
};

export default ServiceListCards;
