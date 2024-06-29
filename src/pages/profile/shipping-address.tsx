import { Button, Card, CardContent, Typography } from '@mui/material'
import React, { useState } from 'react'
import { BillingAddress as IBillingAddress } from '@/api/UserAddress'
import { useAxios } from '@/hooks/useAxios'
import RootLayout from '../layout'
import ProfileLayout from './layout'
import UserAddressModal from '@/components/shared/UserAddressModal'

const ShippingAddress = () => {
    const billingAddress = useAxios("SHIPPING_ADDRESS", true)
    const [open, setOpen] = useState(false)


    return (
        <div className='flex flex-col min-h-full'>
            <Typography variant='h6' fontWeight={600}>Shipping Address</Typography>
            <div className="md:grid grid-cols-2 gap-3 mt-6 mb-4">
                {billingAddress.data?.result?.map((it: IBillingAddress) => (
                    <Card key={it.id} variant='outlined'>
                        <CardContent>
                            <Typography variant='subtitle1'>{it.firstName} {it.lastName}</Typography>
                            <Typography variant='subtitle2'>{it.addressLine1}</Typography>
                            <Typography variant='subtitle2'>{it.addressLine2}</Typography>
                            <Typography variant='subtitle2'>{it.city} | {it.state} | {it.postalCode} | {it.country} </Typography>
                            <Typography variant='subtitle2'>{it.email} | {it.phone}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className=" mt-auto w-full md:w-2/5 ml-auto  space-x-3">

                <Button onClick={() => { setOpen(true) }} fullWidth variant='contained' color='primary'>
                    Add New Shipping Address
                </Button>
            </div>
            <UserAddressModal open={open} onClose={() => { setOpen(false) }} title='Shipping Address' type='CREATE_SHIPPING' />
        </div>
    )
}

ShippingAddress.getLayout = (page: React.ReactElement) => (
    <RootLayout>
        <ProfileLayout>
            {page}
        </ProfileLayout>
    </RootLayout>
)


export default ShippingAddress