import React from 'react'
import { IconButton, Typography } from '@mui/material';
import { IoSearchOutline, IoStarOutline } from 'react-icons/io5';

const UserMessageHeader = () => {
    return (
        <div className='flex items-center px-2 justify-between'>
            <Typography fontSize={18} fontWeight={600}>Messages</Typography>
            <div className="flex items-center space-x-2">
                <IconButton>
                    <IoSearchOutline />
                </IconButton>
                <IconButton>
                    <IoStarOutline />
                </IconButton>
            </div>
        </div>
    )
}

export default UserMessageHeader