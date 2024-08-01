import React, { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import RootLayout from "./layout";
import GoogleMapReact from "google-map-react";
import Link from "next/link";
import Image from "next/image";

const LocationShops = () => {
  const { data } = useAxios("GET_CITIES", true);
  const { data: shopsData } = useAxios("GET_SHOPS", true);
  const [userLocation, setUserLocation] = useState(null);
  const [shopsLocation, setShopsLocation] = useState([]);
  const [hoveredShop, setHoveredShop] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          console.log("User's Location:", { latitude, longitude });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const shopsArray = shopsData?.shops?.map((shop) => ({
    ...shop,
    latitude: parseFloat(shop.latitude),
    longitude: parseFloat(shop.longitude),
  }));

  console.log("shops are", shopsArray);
  console.log("cities from ticket is", data);

  return (
    <>
      {userLocation && (
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyB3VTAihhs6gEYNld1LMwNkEiszH3TRcMQ",
            }}
            center={{
              lat: userLocation.latitude,
              lng: userLocation.longitude,
            }}
            defaultZoom={15}
          >
            <div
              lat={userLocation.latitude}
              lng={userLocation.longitude}
              style={{
                position: "absolute",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Image
                src="https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                alt="User Location"
                width={32}
                height={32}
              />
            </div>

            {shopsArray &&
              shopsArray.map((shop) => (
                <div
                  key={shop.id}
                  lat={shop.latitude}
                  lng={shop.longitude}
                  style={{
                    position: "absolute",
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setHoveredShop(shop)}
                  onMouseLeave={() => setHoveredShop(null)}
                >
                  <Image
                    src="https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    alt="Shop Location"
                    width={32}
                    height={30}
                  />
                  {hoveredShop && hoveredShop.id === shop.id && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        minWidth: "250px",
                        background: "white",
                        fontSize: "18px",
                        padding: "5px",
                        borderRadius: "5px",
                        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
                      }}
                    >
                      <div className="">
                        <Link href={`/vendors/${shop.id}`}>
                          <p
                            className="block"
                            style={{ color: "black", fontWeight: "bolder" }}
                          >
                            {shop.name}
                          </p>

                          <p className="block">{shop.address}</p>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </GoogleMapReact>
        </div>
      )}
    </>
  );
};

LocationShops.getLayout = (page) => <RootLayout>{page}</RootLayout>;

export default LocationShops;
