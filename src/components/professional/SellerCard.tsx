import { Professional } from '@/api/User'
import { Avatar, Rating, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const SellerCard = ({ professional }: { professional: Professional }) => {
    const router = useRouter()

    return (
        <div style={{minHeight:'235px'}} className='shadow-md rounded-2xl flex justify-center min-h-max items-center cursor-pointer py-10 flex-col'

            onClick={() => router.push(`/professional/profile/${professional.id}`)}>
            <Avatar
                sx={{
                    width: 56,
                    height: 56
                }}
                src={professional.photoLogo}
            />
            <Typography className='mt-2 text-center' variant='body1'>{professional.name} </Typography>
            <Typography variant='body1' className='text-center' color='#2D005E'>({professional.profession})</Typography>
            <div className="flex items-center space-x-3">
                <Rating size='small' readOnly={true} value={parseInt(professional.rating)} precision={0.1} />
                <Typography variant='caption' color='#2D005E'>({professional.rating})</Typography>
            </div>
        </div>
    )
}

export default SellerCard