import React from "react";
import { Box, Skeleton } from "@mui/material";

const LoadingCards = () => {
    return (
        <div className="grid md:grid-cols-5 " >
            {Array.from({ length: 5 }).map((_, index) => (
                <Box key={index}>
                    <Skeleton variant="rectangular" width={210} height={118} />
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Box>
                </Box>
            ))}
        </div>
    );
};

export default LoadingCards;
