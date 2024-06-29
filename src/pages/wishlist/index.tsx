import ProductsCarousel from '@/components/shared/ProductsCarousel';
import { useAxios } from '@/hooks/useAxios';
import React, { useEffect } from 'react'
import RootLayout from '../layout';

const WishList = () => {
    return (
        <div className="md:my-24 my-12 space-y-6 md:space-y-12 px-4 md:px-12">
            <ProductsCarousel
                title='Wishlist (9)'
            />
            <ProductsCarousel
                title='Just For You'
            />
        </div>
    )
}

WishList.getLayout = (page) => (
    <RootLayout>
        {page}
    </RootLayout>
)

export default WishList