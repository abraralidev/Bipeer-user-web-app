import React from "react";
import Typography from "@mui/material/Typography";
import {
  TextField,
  IconButton,
  InputAdornment,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Link,
  Box,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Ticket, City } from "@/api/User";
import { getProviders, signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import RootLayout from "../layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "react-toastify";
import TicketCard from "./TicketCard";

const AllTickets = () => {
  const { data } = useAxios("GET_ALL_TICKETS", true);
  console.log("🚀 ~ AllTickets ~ data:", data);
  const tickets: Ticket[] = data.result;

  //   console.log("cities from ticket is", data);

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        // alignItems={"center"}
        height={"auto"}
      >
        <Box maxWidth={"1400px"}>
          <Box textAlign={"center"} mt={"20px"}>
            <Typography textAlign={"center"} fontSize={"25px"} fontWeight={700}>
              Your Support Tickets
            </Typography>
          </Box>
          <TicketCard tickets={tickets} />
        </Box>
      </Box>
    </>
  );
};

AllTickets.getLayout = (page: React.ReactElement) => (
  <RootLayout>{page}</RootLayout>
);

export default AllTickets;

// export async function getServerSideProps(context: any) {
//   const session = await getServerSession(context.req, context.res, authOptions);

//   if (session) {
//     return { redirect: { destination: "/" } };
//   }
//   return { props: { providers: await getProviders() } };
// }
