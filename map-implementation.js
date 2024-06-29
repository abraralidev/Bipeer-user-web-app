import React, { useEffect, useState } from "react";
import Menu from "../sideMenu/Menu";
import GoogleMapReact from "google-map-react";
import RidersMapData, { RiderLocationIcon, drivers } from "./RidersMapData";
import { ShopLocationIcon } from "./VendorsMapData";
import Api from "../util/axiosInstance";
import LoadingSpinner from "../util/LoadingSpinner";

const MapsData = () => {
  const [shopsLocation, setShopsLocation] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    Api.get("/admin/shops/location")
      .then((response) => {
        // convert strings latitude and longitude to float numbers
        const shops = response.data.shops.map((shop) => {
          shop.latitude = parseFloat(shop.latitude);
          shop.longitude = parseFloat(shop.longitude);
          return shop;
        });
        setShopsLocation(shops);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log({ shopsLocation });

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <Menu>
      <div className="flex flex-col space-y-20">
        <div className="w-full h-[90vh] overflow-hidden">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: ${process.env.REACT_APP_MAP_KEY},
            }}
            defaultCenter={{
              lat: shopsLocation[0]?.latitude,
              lng: shopsLocation[0]?.longitude,
              // lat: 31.5872,
              // lng: 74.3125,
            }}
            defaultZoom={15}
          >
            {/* {drivers.map((driver) => (
              <RiderLocationIcon
                lat={driver.lat}
                lng={driver.lng}
                driver={driver}
              />
            ))} */}
            {shopsLocation.map((shop) => {
              return (
                <ShopLocationIcon
                  key={shop.id || ""}
                  // lat={32.0974207}
                  // lng={74.8622462}
                  lat={shop.latitude || ""}
                  lng={shop.longitude || ""}
                  shop={shop}
                />
              );
            })}
            {/* <ShopLocationIcon
              lat={32.0974207}
              lng={74.8622462}
              shop={shopsLocation[0]}
            /> */}
          </GoogleMapReact>
        </div>

        {/* <RidersMapData />
        <RestaurantsMapData /> */}
      </div>
    </Menu>
  );
};

export default MapsData;