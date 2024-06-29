import { Box, Rating, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

type CategoryCardProps = {
  title: String;
  image: String;
};

const ProductReviewCard = ({ name, rating, key, review }: any) => {
  let styles = {
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
    height: "70px",
  };

  const router = useRouter();
  return (
    <Box sx={{borderBottom:'1px solid #00000021',marginBottom:'25px',padding:'20px'}}>
      <Box display={'flex'} gap={'20px'}  alignItems={'center'}>
        <Typography fontSize={'25px'} fontWeight={'800'}>{name}</Typography>

        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'5px'}>
            <Typography fontSize={'15px'} fontWeight={'800'}>
                ({rating})
            </Typography>
        <Rating
          name="simple-controlled"
          value={rating}    
        //   onChange={(event, newValue) => {
        //     setValue(newValue);
        //   }}
        />
        </Box>
        
      </Box>

      <Typography marginTop={'15px'} fontSize={'18px'} fontWeight={500}>
        {review}
      </Typography>
    </Box>
  );
};

export default ProductReviewCard;
