import React, { useState } from "react";
import { Stack, Typography, Button } from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";

type CategoriesCarouselProps = {
  title: string;
  reviews: {
    id: string;
    Customer: { name: string };
    rating: number;
    review: string;
  }[];
};

const ProductReviewCarousel = ({ title, reviews }: CategoriesCarouselProps) => {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const handleShowMore = () => {
    setVisibleReviews((prev) => prev + 3); // Load 3 more reviews each time button is clicked
  };

  return (
    <div className="w-[90%] mx-auto">
      <Stack justifyContent="space-between">
        <Typography gutterBottom mb={2} variant="h6">
          {title} ({reviews?.length})
        </Typography>
      </Stack>
      {reviews.slice(0, visibleReviews).map((review) => (
        <ProductReviewCard
          name={review.Customer.name}
          rating={review.rating}
          key={review.id}
          review={review.review}
        />
      ))}
      {visibleReviews < reviews.length && (
        <Stack mt={2} alignItems="center">
          <Button variant="contained" onClick={handleShowMore}>
            Show More
          </Button>
        </Stack>
      )}
    </div>
  );
};

export default ProductReviewCarousel;
