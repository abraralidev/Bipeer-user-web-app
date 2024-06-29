import { Product } from '@/api/Product';
import { useAxios } from '@/hooks/useAxios';
import React from 'react'
import Slider from 'react-slick'
import { Stack, Typography } from '@mui/material';
import ProductCard from '../shared/ProductCard';

type ProductCarouselProps = {
    title: string;
    products: Product[]
}

const ProductsCarousel = ({ title, products }: ProductCarouselProps) => {
    return (
        <div>
            <Stack justifyContent='space-between'>
                <Typography gutterBottom mb={4} variant='h6'>{title} </Typography>
            </Stack>
            {products?.length > 0 ?
                <div className='grid md:grid-cols-5 gap-x-8'>
                    {products?.map((product: Product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
                :
                <Typography variant='h5' textAlign='center' alignItems='center' justifyContent='center'>There is no such product!</Typography>
            }
        </div>

    )
}

export default ProductsCarousel