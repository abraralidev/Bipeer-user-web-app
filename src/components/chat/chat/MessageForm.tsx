import { IconButton, TextField } from '@mui/material';
import React, { useState } from 'react'
import { IoAttachOutline, IoSendOutline } from 'react-icons/io5';

const MessageForm = () => {
  const [inputVal, setInputVal] = useState("")
  return (
    <div className='absolute bottom-0 left-0 right-0 border-t py-3 px-4 flex items-center justify-between w-full border-t-gray-700'>
      <TextField 
      fullWidth
      size='small'
      placeholder='Type your message here'
      />
      <div className="flex items-center space-x-2">
        <IconButton>
          <IoAttachOutline />
        </IconButton>
        <IconButton>
          <IoSendOutline />
        </IconButton>
      </div>
    </div>
  )
}

export default MessageForm