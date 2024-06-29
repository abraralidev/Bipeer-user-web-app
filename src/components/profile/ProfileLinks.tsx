import { List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'
import LinkItem from './LinkItem'
import LogoutItem from './LogoutItem'

const ProfileLinks = () => {
  return (
    <List>
      <ListItem>

        <ListItemText primary='Managing Account'

          secondary={
            <List>
              <LinkItem
                text='My Profile'
                url='general-info'
              />
              <LinkItem
                text='Change Password'
                url='change-password'
              />
              <LogoutItem text='Logout' />
            </List>
          } />
      </ListItem>
      <ListItem>

        <ListItemText primary='My Orders'

          secondary={
            <List>
              <LinkItem text='Order History'
                url='order-history'
              />
              <LinkItem text='Shipping Address'
                url='shipping-address'
              />
              <LinkItem text='Billing Address'
                url='billing-address'
              />
            </List>
          } />
      </ListItem>
    </List>
  )
}

export default ProfileLinks