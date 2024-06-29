import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import {
  TextField,
  Button,
  Avatar,
  MenuItem,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useAxios } from "@/hooks/useAxios";
import { User } from "@/api/User";
import { City } from "@/api/City";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import RootLayout from "./layout";

interface UserForm extends User {
  confirmPassword: string;
  cityId: string;
  address: string;
  image: FileList; // Change to FileList to handle file upload
}

const UserAccount = () => {
  const [profileImage, setProfileImage] = useState<FileList | null>(null); // Change type to FileList
  const [displayImage, setDisplayImage] = useState<string | null>(null);
  const router = useRouter();
  const cities = useAxios("GET_CITIES", true);
  const { data } = useAxios("GET_CUSTOMER_PROFILE", true);
  const { makeRequest: updateCustomerAccount } = useAxios(
    "UPDATE_CUSTOMER_PROFILE",
    true
  );

  const { control, handleSubmit, register, reset } =
    useForm<UserForm>({});

  useEffect(() => {
    if (data && data.customer) {
      const { name, email, phone, address, cityId, image } = data.customer;
      reset({
        name: name || "",
        email: email || "",
        phone: phone || "",
        address: address || "",
        cityId: cityId || "",
      });
      if (image) {
        setDisplayImage(image);
      }
    }
  }, [data, reset]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target?.files?.[0];
    if (file) {
      setProfileImage(event.target.files); // Store the selected file(s)
      const imageURL = URL.createObjectURL(file);
      setDisplayImage(imageURL); // Display the image preview
    }
  };

  const onSubmit = (formData: UserForm) => {
    const formDataToSend = new FormData();
    
    for (const key in formData) {
      if (formData[key]) {
        if (key === "image" && profileImage) {
          for (let i = 0; i < profileImage.length; i++) {
            formDataToSend.append("image", profileImage[i]);
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
    }

    updateCustomerAccount(
      (res) => {
        toast.success("Updated User Successfully");
        console.log(res);
      },
      (err) => {
        toast.error("Something went wrong");
      },
      {
        body: formDataToSend,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-full max-w-4xl p-6 bg-white rounded-md shadow-md">
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Personal Info
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Update your photo and personal details here
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 gap-6">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontSize="25px" fontWeight="600">
                Name
              </Typography>
              <TextField
                {...register("name")}
                variant="outlined"
                sx={{ width: "60%", borderRadius: "8px", boxShadow: "3px 4px #0000001f" }}
              />
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontSize="25px" fontWeight="600">
                Email
              </Typography>
              <TextField
                {...register("email")}
                variant="outlined"
                sx={{ width: "60%", borderRadius: "8px", boxShadow: "3px 4px #0000001f" }}
              />
            </Box>
          </div>

          <Box className="flex items-center space-x-4">
            <label className="flex flex-col items-center">
              <input
                className="hidden"
                type="file"
                onChange={handleFileChange}
              />
              <Avatar
                src={displayImage}
                alt="user photo"
                sx={{ width: 100, height: 100, cursor: "pointer" }}
              />
              <Button variant="outlined" size="small" className="mt-1">
                Change Picture
              </Button>
            </label>
            <Typography variant="body2" color="textSecondary">
              This photo will be displayed on your profile
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize="25px" fontWeight="600">
              Phone
            </Typography>
            <TextField
              {...register("phone")}
              variant="outlined"
              sx={{ width: "60%", borderRadius: "8px", boxShadow: "3px 4px #0000001f" }}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize="25px" fontWeight="600">
              City
            </Typography>

            <TextField
              {...register("cityId")}
              variant="outlined"
              sx={{ width: "60%", borderRadius: "8px", boxShadow: "3px 4px #0000001f" }}
              select
            >
              {cities?.data?.cities?.map((city: City) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize="25px" fontWeight="600">
              Address
            </Typography>
            <TextField
              variant="outlined"
              multiline
              rows={3}
              sx={{ width: "60%", borderRadius: "8px", boxShadow: "3px 4px #0000001f" }}
              {...register("address")}
            />
          </Box>

          <Box className="flex justify-end space-x-4">
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              size="large"
              variant="contained"
              type="submit"
            >
              Save Changes
            </Button>
          </Box>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

UserAccount.getLayout = (page: React.ReactElement) => (
  <RootLayout>{page}</RootLayout>
);

export default UserAccount;
