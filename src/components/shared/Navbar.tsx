import React, { useEffect, useState } from "react";
import { CiShoppingCart, CiSearch, CiHeart } from "react-icons/ci";
import {
  TextField,
  InputAdornment,
  Badge,
  Button,
  Grid,
  Box,
  MenuItem,
  Menu,
  IconButton,
} from "@mui/material";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { signOut, useSession } from "next-auth/react";
import { useCart } from "@/contexts/CartProvider";
import { useRouter } from "next/router";
import NavbarMenu from "./NavbarMenu";
import { useAxios } from "@/hooks/useAxios";
import { Category } from "@/api/Category";
import { useForm } from "react-hook-form";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import GoogleTranslateButton from "../GoogleTranslateBtn";
import { useFavorites } from "@/contexts/FavouritesProvider";

const Navbar = () => {
  const { status } = useSession();
  const { state } = useCart();
  const { state: fav } = useFavorites();
  const router = useRouter();
  const categories = useAxios("CATEGORIES", true);
  console.log(categories);

  const { makeRequest: productsByFilter } = useAxios("PRODUCTS_BY_Filter");

  const { register, handleSubmit, watch, setValue } = useForm();

  const { data: session } = useSession();

  // const searchProductsByFilter = (data) => {};

  const categoryValue = watch("category");
  const queryValue = watch("product_name");

  const onSubmit = (data) => {
    console.log(data);
    // searchProductsByFilter(data);
    router.push({
      pathname: "/products/product-filter",
      query: {
        query: data.product_name ?? "",
        category: data.category ?? "",
      },
    });
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
    handleMenuClose();
  };

  useEffect(() => {
    if (categoryValue && Boolean(categoryValue?.length)) {
      console.log("cat changed");
      setValue("product_name", "");
      console.log(categoryValue);
      // router.push({
      //   pathname: "/products/product-filter",
      //   query: {
      //     query: queryValue,
      //     categoryId: categoryValue,
      //   },
      // });
      handleSubmit(onSubmit)();
    }
  }, [categoryValue]);

  useEffect(() => {
    if (queryValue && Boolean(categoryValue?.length)) {
      console.log("query setted");
      setValue("category", "");
    }
  }, [queryValue]);

  return (
    <>
      {/* nav bar for mobile Start*/}
      <div className="md:pt-1 block sm:hidden md:px-16 px-2 sticky z-50 bg-white shadow top-0">
        <Grid
          container
          className="border-b border-b-gray-300 px-3 md:px-12 pb-4"
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            className="flex items-center justify-between md:justify-start space-x-6"
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Box>
                <Logo />
              </Box>

              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"10px"}
              >
                <CiHeart className="text-2xl hidden md:flex" />
                <Badge badgeContent={state.cart.length} color="primary">
                  <CiShoppingCart
                    fontSize={"35px"}
                    onClick={() => {
                      router.push("/cart");
                    }}
                    className="cursor-pointer"
                  />
                </Badge>
                <NavbarMenu />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={8} className="flex items-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full sm:mt-0 mt-5"
            >
              <TextField
                placeholder="Type something here"
                size="small"
                fullWidth={true}
                variant="outlined"
                {...register("product_name")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <Button
                        type="submit"
                        sx={{
                          position: "relative",
                          left: "21px",
                          paddingTop: "7px",
                          paddingBottom: "7px",
                        }}
                        color="info"
                      >
                        <CiSearch fontSize={"24px"} />
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Grid>
        </Grid>
      </div>
      {/* nav bar for mobile Ends*/}

      {/* navbar for tablets/laptops Start */}

      <div className="md:pt-1 hidden md:block px-2 sticky z-50 bg-white shadow top-0">
        <Grid
          container
          className="border-b border-b-gray-300 px-3 md:px-[1rem]  lg:px-[10rem] pb-4 flex justify-between items-center"
        >
          <Grid
            item
            md={1}

            // className="flex items-center justify-between md:justify-start space-x-6"
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Box>
                <Logo />
              </Box>
            </Box>
          </Grid>

          <Grid item md={9} className="flex items-center mt-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full sm:mt-0 mt-5"
            >
              <TextField
                placeholder="Type something here"
                size="small"
                fullWidth={true}
                variant="outlined"
                {...register("product_name")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <div className="flex items-center space-x-2">
                        <select
                          {...register("category")}
                          className="border-l border-l-gray-400 focus:outline-none cursor-pointer"
                          style={{
                            padding: "8px",
                            borderLeft: "1px solid",
                            background: "transparent",
                          }}
                        >
                          <option value="">All Categories</option>
                          {categories.data?.result?.map(
                            (category: Category) => (
                              <React.Fragment key={category.id}>
                                <option value={category.id}>
                                  {category.name}
                                </option>
                                {category.SubCategory.length > 0 &&
                                  category.SubCategory.map((subCategory) => (
                                    <option
                                      key={subCategory.id}
                                      value={subCategory.id}
                                    >
                                      &nbsp;&nbsp;&nbsp;{subCategory.name}
                                    </option>
                                  ))}
                              </React.Fragment>
                            )
                          )}
                        </select>

                        <Button
                          type="submit"
                          sx={{
                            position: "relative",
                            left: "14px",
                            padding: "7px",
                            minWidth: "auto",
                            // marginLeft: "-8px",
                          }}
                          color="info"
                        >
                          <CiSearch fontSize={"24px"} />
                        </Button>
                      </div>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Grid>

          <Grid item md={2} className="flex justify-center items-center">
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"10px"}
            >
              <Badge badgeContent={fav.favorites.length} color="primary">
                <CiHeart
                  fontSize={"26px"}
                  onClick={() => {
                    router.push("/favourite");
                  }}
                  className="cursor-pointer"
                />
              </Badge>
              <Badge badgeContent={state.cart.length} color="primary">
                <CiShoppingCart
                  fontSize={"26px"}
                  onClick={() => {
                    router.push("/cart");
                  }}
                  className="cursor-pointer"
                />
              </Badge>
              {session && (
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                >
                  <PermIdentityIcon />
                </IconButton>
              )}
              {/* <GoogleTranslateButton />
              <div id="google_translate_element"></div> */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                {/* <MenuItem >{user.name}</MenuItem> */}
              </Menu>
              {/* <NavbarMenu /> */}
            </Box>
          </Grid>
        </Grid>
      </div>

      {/* navbar for tablets/laptops End*/}
    </>
  );
};

export default Navbar;
