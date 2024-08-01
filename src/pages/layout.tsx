import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Navbar from "@/components/shared/Navbar";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import { signOut } from "next-auth/react";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showAppDownload, setShowAppDownload] = useState(true);

  const handleHideAppDownload = () => {
    setShowAppDownload(false);
  };

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      console.log("i am from MyComponent", session);
      console.log("i am from MyComponent token", session.backendToken);
    }
  }, [session]);

  return (
    <>
      <main>
        {/* Box only visible on mobile screens */}
        <div className={`md:hidden ${showAppDownload ? "block" : "hidden"}`}>
          <div className="mt-[5rem]"></div>
          <Box
            className="fixed top-0 flex left-0 w-full bg-gray-800 text-white px-3 pt-1 pb-3"
            sx={{ zIndex: 1000 }}
          >
            <span className="mr-2" onClick={handleHideAppDownload}>
              <IoCloseSharp />
            </span>

            <img
              loading="lazy"
              src="http://localhost:3000/_next/image?url=%2Fassets%2Fimages%2Fmain_logo.png&w=128&q=75"
              alt="logo"
              className="h-[50px]"
            />

            <div style={{ width: "-webkit-fill-available" }} className="">
              <div className="text-center">
                <p>Download our app!</p>
              </div>
              {/* <Button onClick={handleHideAppDownload}>Close</Button> */}
              <Button
                color="info"
                sx={{ ml: "10px", width: "-webkit-fill-available" }}
                onClick={handleHideAppDownload}
              >
                Install
              </Button>
            </div>
          </Box>
        </div>
        {/* Header */}
        {!session && <Header />}
        {/* {session && (
          <>
            <Box display={"flex"} justifyContent={"end"}>
              <p
                className="cursor-pointer"
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
              >
                Logout
              </p>
            </Box>
          </>
        )} */}
        {/* Navbar */}
        <Navbar />
        {/* Main content */}
        <div>{children}</div>
        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
