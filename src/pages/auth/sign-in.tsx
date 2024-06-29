import React from "react";
import Typography from "@mui/material/Typography";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useForm } from "react-hook-form";
import { User } from "@/api/User";
import { getProviders, signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import RootLayout from "../layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useAxios } from "@/hooks/useAxios";

const SignIn = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { register, handleSubmit } = useForm<User>();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };


  
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
            Log in to Exclusive
          </Typography>
          <Typography variant="subtitle1" fontWeight={500} gutterBottom>
            Enter your details below
          </Typography>

          <form
            onSubmit={handleSubmit(async (data: any) => {
              const result = await signIn("credentials", {
                ...data,
                redirect: false,
              });
              const redirectUrl = searchParams.get("from");
              if (result?.ok) {
                router.push("/");
                // console.log(loginCustomer());  
                
                console.log('result is', result);
                console.log('data is', data);
                
              } else {
                console.error("Login failed");
              }
            })}
            className="space-y-6 mt-6"
          >
            <TextField
              {...register("email")}
              variant="standard"
              fullWidth
              label="Email or Phone Number"
            />
            <TextField
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
            />
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

SignIn.getLayout = (page: React.ReactElement) => (
  <RootLayout>{page}</RootLayout>
);

export default SignIn;

// export async function getServerSideProps(context: any) {
//   const session = await getServerSession(context.req, context.res, authOptions);

//   if (session) {
//     return { redirect: { destination: "/" } };
//   }
//   return { props: { providers: await getProviders() } };
// }
