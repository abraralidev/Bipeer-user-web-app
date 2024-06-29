import { Skeleton } from '@mui/material'
import React from 'react'

const LoadingList = () => {
    return Array.from({ length: 8 }).map((_, i) => (
        <Skeleton width='60%' key={i} />
    ))
}

export default LoadingList