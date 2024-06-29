import { categoryData } from '@/api/Category'
import { Button, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const ProfessionalBanner = () => {
    return (
        <div className='relative'>
            <Image width={1280} height={720} src='/assets/images/servicebanner.png' className='w-full' />
            <div className='absolute left-[10%] top-[40%] '>
                <Typography className='w-[20ch] md:!text-3xl  !text-xl '  color='white' fontWeight={600}> Find Best Freelance Service for your business</Typography>
                <div className="md:flex  hidden items-center space-x-3 mt-4">
                    <Typography fontSize={16} color='white' fontWeight={600}>Popular : </Typography>
                    {categoryData.slice(0, 4).map(category => (
                        <Button color='inherit' variant='outlined' sx={{
                            borderColor:'white',
                            color:'white'
                        }} size='small'>{category.name} </Button>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default ProfessionalBanner