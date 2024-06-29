import { Avatar, ListItem, ListItemButton, Typography } from '@mui/material'
import React from 'react'

const UserMessage = () => {
  return (
    <ListItem className='px-2 py-3'>
      <ListItemButton className='flex items-center !justify-between '>
        <div className="flex items-center space-x-3">
          <Avatar sx={{
            height: 48,
            width: 48
          }} />
          <div>
            <Typography>Joseph McDonah</Typography>
            <Typography variant='caption'>5+ new messages</Typography>
          </div>
        </div>
        <div className="min-h-2 min-w-2 bg-[#0bbe70] rounded-full "> </div>
      </ListItemButton>

    </ListItem>
  )
}

export default UserMessage