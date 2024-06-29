import { Button, Dialog, DialogContent, DialogTitle, Divider, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { UserAddress } from '@/api/UserAddress';
import { useAxios } from '@/hooks/useAxios';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
    subsets: ['cyrillic']
})

type UserAddressModalType = {
    open: boolean;
    onClose: () => void;
    title: string;
    type: 'CREATE_SHIPPING'
    | 'CREATE_BILLING'
}

const UserAddressModal = ({ open, onClose, title, type }: UserAddressModalType) => {
    const { register, handleSubmit, control } = useForm<UserAddress>();
    const address = useAxios(type);

    const onSubmit = (data: UserAddress) => {
        console.log(data);
        address.makeRequest(onClose, () => { }, { body: data })
    };

    return (
        <Dialog
            maxWidth='sm'
            fullWidth
            className={`${montserrat.className}`}
            open={open}
            onClose={onClose}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col space-y-3'>
                        <TextField {...register('firstName')} placeholder="First Name" />
                        <TextField {...register('lastName')} placeholder="Last Name" />
                        <TextField {...register('addressLine1')} placeholder="Address Line 1" />
                        <TextField {...register('addressLine2')} placeholder="Address Line 2" />
                        <Divider variant='fullWidth' />
                        <TextField {...register('city')} placeholder="City" />
                        <TextField {...register('state')} placeholder="State" />
                        <TextField {...register('postalCode')} placeholder="Postal Code" />
                        <TextField {...register('country')} placeholder="Country" />
                        <TextField {...register('email')} placeholder="Email" />
                        <TextField {...register('phone')} placeholder="Phone" />
                        <Button type="submit" fullWidth variant='contained' color='primary'>Add Address</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UserAddressModal;
