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

const CreateTicket = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { register, handleSubmit } = useForm<Ticket>();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { data } = useAxios("GET_CITIES", true);
  const { makeRequest: createTicket } = useAxios("CREATE_TICKET");

  console.log("cities from ticket is", data);

  return (
    <div style={{ height: "90vh" }} className="flex items-center ">
      <Image
        alt="auth image"
        width={720}
        height={1560}
        className="w-[60%] h-full hidden md:block"
        src="/assets/images/auth.jpeg"
      />
      <div className="px-12">
        <div>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Report a Problem
          </Typography>
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            Enter the details below
          </Typography>

          <form
            onSubmit={handleSubmit(async (data: any) => {
              console.log("form data is", data);

              createTicket(
                () => {
                  toast.success("Created Ticket Successfully");
                },
                (err) => {
                  console.log(err);
                  toast.warn("Ticket Generation Failed");
                },
                {
                  body: data,
                }
              );
            })}
            className="space-y-6 mt-6"
          >
            <TextField
              {...register("title")}
              variant="standard"
              fullWidth
              label="Title"
            />
            <TextField
              {...register("description")}
              variant="standard"
              fullWidth
              label="Description"
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                {...register("cityId")}
              >
                {data &&
                  data?.cities?.map((city: City) => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.name}
                    </MenuItem>
                  ))}
                {/* <MenuItem value={'Other'}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>

            {/* <TextField
              {...register("password")}
              variant="standard"
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            /> */}
            <Button
              type="submit"
              color="primary"
              variant="primary"
              className="!px-8 !py-3"
            >
              Log In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

CreateTicket.getLayout = (page: React.ReactElement) => (
  <RootLayout>{page}</RootLayout>
);

export default CreateTicket;

// export async function getServerSideProps(context: any) {
//   const session = await getServerSession(context.req, context.res, authOptions);

//   if (session) {
//     return { redirect: { destination: "/" } };
//   }
//   return { props: { providers: await getProviders() } };
// }
