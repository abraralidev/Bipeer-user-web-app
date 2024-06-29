import React from 'react'
import {
    Button,
    Divider,
    Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useCart } from '@/contexts/CartProvider';


const defaultValues = {
    zip: '',
    city: '',
    country: 'pk',
    province: 'punjab',
    shipping: 'cod',
};

export const CartTotals = () => {
    const { state: { cartTotal } } = useCart()
    const router = useRouter()
    const { control, formState, handleSubmit, setError, setValue } = useForm({
        mode: 'onChange',
        defaultValues,
        // resolver: yupResolver(schema),
    });

    return (
        <div className='md:flex px-4 py-1 rounded-md border-2 w-full md:w-2/5 ml-auto border-gray-700 mt-4 '>
            <div className='md:flex-col w-full pt-4'>
                <Typography variant='h6' fontWeight={600} className=''>
                    Cart Totals
                </Typography>
                <div className=' p-3 mt-3'>
                    <div className='flex w-full justify-between'>
                        <Typography className='!font-medium'>Subtotal</Typography>
                        <Typography className='' color='text.secondary'>
                            ${cartTotal}
                        </Typography>
                    </div>
                    <Divider
                        variant='fullWidth'
                        sx={{
                            borderBottomWidth: 2,
                            my: 1
                        }}
                    />
                    <div className='flex w-full justify-between'>
                        <Typography className='!font-medium'>Shipping</Typography>
                        <Typography color='text.secondary'>
                            Free
                        </Typography>
                    </div>
                    <Divider
                        variant='fullWidth'
                        sx={{
                            borderBottomWidth: 2,
                            my: 1
                        }}
                    />
                    <div className='flex w-full justify-between'>
                        <Typography className='!font-medium'>Total</Typography>
                        <Typography className='' color='text.secondary'>
                            ${cartTotal}
                        </Typography>
                    </div>

                    <div
                        className='flex w-full justify-center items-center mt-6'
                    >
                        <Button
                            color='primary'
                            size='small'
                            className='p-2'
                            onClick={() => {
                                router.push('/checkout')
                            }}
                            style={{ borderRadius: '8px' }}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
