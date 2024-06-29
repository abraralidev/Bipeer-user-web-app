import UserCart from '@/components/cart/UserCart'
import React from 'react'
import RootLayout from '../layout'

const index = () => {
    return (
        <UserCart />
    )
}

index.getLayout = (page) => (
    <RootLayout>
        {page}
    </RootLayout>
)

export default index