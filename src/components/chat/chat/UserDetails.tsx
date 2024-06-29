import { Avatar, IconButton, Typography } from '@mui/material'
import React from 'react'
import { IoCallOutline, IoSettingsOutline } from 'react-icons/io5'
import { MdOutlineVideoCall } from 'react-icons/md'

const UserDetails = () => {
  return (
    <div className='flex cursor-pointer  items-center justify-between px-6 border-b border-b-gray-700 py-4'>
      <div className="flex items-center space-x-3">
        <Avatar sx={{
          height: 48,
          width: 48
        }} />
        <div>
          <Typography variant='subtitle1' >Joseph Mcdonagh</Typography>
          <Typography variant='caption'>Active 5 mins ago</Typography>
        </div>

      </div>
      <div className="flex items-center space-x-2">
        {/* <IconButton>
          <IoCallOutline />
        </IconButton>
        <IconButton>
          <MdOutlineVideoCall />
        </IconButton>
        <IconButton>
          <IoSettingsOutline />
        </IconButton> */}
      </div>
    </div>
  )
}

export default UserDetails