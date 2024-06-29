import React from 'react'
import UserMessage from './UserMessage'
import { List } from '@mui/material'

const MessagesSection = () => {
  return (
    <List className='mt-2 mb-1 '>
      <UserMessage />
      <UserMessage />
      <UserMessage />
      <UserMessage />
      <UserMessage />
    </List>
  )
}

export default MessagesSection