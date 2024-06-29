import { ListItem, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react'
// import { useNavigate } from 'react-router-dom';

type LinkItemProps = {
    text: string;
    url: string;
}

const LinkItem = ({ text, url }: LinkItemProps) => {
    const router = useRouter()
    return (
        <ListItem
            className='cursor-pointer'
            onClick={() => {
                router.push(`/profile/${url}`)
            }}
            sx={{
                py: 0
            }}>
            <ListItemText primary={text}
            />
        </ListItem>
    )
}

export default LinkItem