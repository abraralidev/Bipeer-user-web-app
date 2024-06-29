import { ListItem, ListItemText } from '@mui/material';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react'
// import { useNavigate } from 'react-router-dom';

type LinkItemProps = {
    text: string;
}

const LogoutItem = ({ text }: LinkItemProps) => {
    const router = useRouter()
    return (
        <ListItem
            className='cursor-pointer'
            onClick={() => {
                router.push('/')
                signOut()
            }}
            sx={{
                py: 0
            }}>
            <ListItemText primary={text}
            />
        </ListItem>
    )
}

export default LogoutItem