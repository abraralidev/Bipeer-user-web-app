import { Typography } from '@mui/material'
import React from 'react'
import RootLayout from '../layout'
import ProfileLayout from './layout'

const OrderHistory = () => {
    return (
        <div>
            <Typography variant='h6' fontWeight={600}>Order History</Typography>
        </div>
    )
}


OrderHistory.getLayout = (page: React.ReactElement) => (
    <RootLayout>
        <ProfileLayout>
            {page}
        </ProfileLayout>
    </RootLayout>
)


export default OrderHistory