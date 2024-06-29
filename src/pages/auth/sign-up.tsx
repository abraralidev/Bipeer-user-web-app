import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import {
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Avatar,
  Divider,
  MenuItem,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff, MdEdit } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import { useAxios } from "@/hooks/useAxios";
import { User } from "@/api/User";
import { City } from "@/api/City";
import Link from "next/link";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import RootLayout from "../layout";
import Image from "next/image";

interface UserForm extends User {
  confirmPassword: string;
  cityId: string;
  address: string;
}

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const cities = useAxios("GET_CITIES", true);
  const registerUser = useAxios("REGISTER");
  const [profileImage, setProfileImage] = useState<any>(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [location, setLocation] = useState({
    lng: 0,
    lat: 0,
  });

  const { control, handleSubmit, register } = useForm<UserForm>({});

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    if ("geolocation" in navigator)
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setLocation({ lng: longitude, lat: latitude });
        },
        () => {}
      );
  }, []);

  return (
    <div className="flex items-center">
      <Image
        alt="auth image"
        width={720}
        height={1560}
        className="w-[57%] h-full"
        src="/assets/images/auth.jpeg"
      />
      <div className="px-12">
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Create an account
        </Typography>
        <Typography variant="subtitle1" fontWeight={500} gutterBottom>
          Enter your details below
        </Typography>

        <form
          onSubmit={handleSubmit((data: any) => {
            delete data.confirmPassword;
            const formData = new FormData();

            for (const key in data) {
              formData.append(key, data[key]);
            }
            // console.log('====>>>>> _data =>>>', data)
            registerUser.makeRequest(
              () => router.push("/auth/sign-in"),
              () => {
                toast.error("Error While Creating Account");
              },
              {
                body: formData,
              }
            );
            // dispatch(createNewAccount({
            //     ...data,
            //     latitude: location.lat,
            //     longitude: location.lng,
            //     image: profileImage
            // })).then(({ payload }) => {
            //     if (payload.customer) {
            //         router.push('/auth/sign-in')
            //     }
            // })
          })}
          className="space-y-6 mt-6"
        >
          <div className="flex space-x-2">
            <div>
              <span className="pt-4 mr-4 flex flex-col items-center">
                <label className="flex flex-col items-center" htmlFor="image">
                  <input
                    className="hidden w-full text-center"
                    id="image"
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event?.target?.files?.[0];
                      if (file) {
                        setProfileImage(file);
                        const reader: any = new FileReader();
                        reader.onload = () => {
                          if (typeof reader.result === "string") {
                            setDisplayImage(reader.result);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <Avatar
                    // className=""
                    src={displayImage}
                    alt="user photo"
                    sx={{
                      width: 72,
                      height: 72,
                    }}
                  ></Avatar>
                  <div className="mt-2 items-center whitespace-nowrap flex">
                    <small className=" flex cursor-pointer">
                      <span>
                        {/* <FuseSvgIcon className='text-32 mr-2' size={16}>
                                  feather:edit
                                </FuseSvgIcon> */}
                        <MdEdit className="mr-1 text-lg" />
                      </span>
                      <span> Change Picture</span>
                    </small>
                  </div>
                </label>
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <TextField
                  {...register("name")}
                  variant="standard"
                  fullWidth
                  label="Name"
                />
                <TextField
                  {...register("email")}
                  variant="standard"
                  fullWidth
                  label="Email"
                />
              </div>
              <TextField
                {...register("phone")}
                variant="standard"
                fullWidth
                label="Phone Number"
              />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <TextField
              variant="standard"
              fullWidth
              {...register("password")}
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
            <TextField
              variant="standard"
              fullWidth
              {...register("confirmPassword")}
              label="Confirm Password"
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
          </div>
          {/* <Divider
          variant="middle"
          sx={{
            my: 3,
            borderBottomWidth: 2,
          }}
        /> */}
          <TextField
            variant="standard"
            {...register("cityId")}
            fullWidth
            label="Select City"
            select
            inputProps={{
              style: {},
            }}
            InputProps={
              {
                // disableUnderline: true,
              }
            }
          >
            {cities?.data?.cities?.map((city: City) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            variant="outlined"
            multiline={true}
            rows={3}
            fullWidth
            label="Address"
            {...register("address")}
          />

          <Button
            color="primary"
            size="large"
            className="!py-2 mt-4"
            variant="primary"
            fullWidth
            type="submit"
          >
            Create Account
          </Button>
          <div className="w-1/2 mx-auto flex justify-evenly items-center">
            <Typography fontWeight={400}>Already have account?</Typography>
            <Typography
              href="/auth/sign-in"
              color="gray"
              className="!border-b pb-1  cursor-pointer"
              fontWeight={500}
              component={Link}
            >
              Log in{" "}
            </Typography>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

SignUp.getLayout = (page: React.ReactElement) => (
  <RootLayout>{page}</RootLayout>
);

export default SignUp;
