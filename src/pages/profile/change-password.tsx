import { Button, TextField, Typography } from '@mui/material'
import React from 'react'
import ProfileLayout from './layout'
import RootLayout from '../layout'

const ChangePassword = () => {
    return (
        <div>
            <Typography variant='h6' fontWeight={600}>Change Your Passowrd</Typography>

            <div className=" mt-4 flex flex-col space-y-3 ">
                <TextField variant='filled' label='Current Password' />
                <TextField variant='filled' label='New Password' />
                <TextField variant='filled' label='Retype New Password' />
            </div>
            {/* <div className=" mt-12 w-full md:w-2/5  ml-auto flex items-center space-x-3">
                <Button variant='text' color='inherit'>
                    Cancel
                </Button>
                <Button fullWidth variant='contained' color='primary'>
                    Save Changes
                </Button>
            </div> */}
        </div>
    )
}

ChangePassword.getLayout = (page: React.ReactElement) => (
    <RootLayout>
        <ProfileLayout>
            {page}
        </ProfileLayout>
    </RootLayout>
)

export default ChangePassword