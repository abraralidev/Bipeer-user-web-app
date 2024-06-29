import { Button, FormControl, FormLabel, TextField, Typography } from '@mui/material'
import React from 'react'
import ProfileLayout from './layout'
import RootLayout from '../layout'

const AccountInfo = () => {
    return (
        <div>
            <Typography variant='h6' fontWeight={600}>Edit Your Profile</Typography>

            <div className="md:grid grid-cols-2 mt-4 gap-x-3 gap-y-6">
                <TextField variant='filled' label='First Name' />
                <TextField variant='filled' label='Last Name' />
                <TextField variant='filled' label='Email' />
                <TextField variant='filled' label='Address' />
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


AccountInfo.getLayout = (page: React.ReactElement) => (
    <RootLayout>
        <ProfileLayout>
            {page}
        </ProfileLayout>
    </RootLayout>
)


export default AccountInfo