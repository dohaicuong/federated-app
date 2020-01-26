import React from 'react'
import { Typography, IconButton, Menu, MenuItem, Button } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { Link } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'
// import { useApolloClient } from '@apollo/react-hooks'

export default () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleProfileMenuClose = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(null)

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Button color='inherit' startIcon={<DashboardIcon />} component={Link} to='/app/dashboard'>
        Dashboard
      </Button>
      <div style={{ flexGrow: 1 }} />
      <Typography variant='h6' noWrap>
        App
      </Typography>
      <div style={{ flexGrow: 1 }} />
      <IconButton edge='end' color='inherit' onClick={handleProfileMenuOpen}>
        <AccountCircleIcon />
      </IconButton>
      <ProfileMenu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleProfileMenuClose}
      />
    </div>
  )
}

const ProfileMenu = (props: any) => {
  // const { push } = useHistory()
  // const client = useApolloClient()

  const handleLogout = async () => {
    localStorage.clear()
    props.onClose()

    // TODO use clear store instead of location reload when apollo client fix it
    // await client.clearStore()
    // push('/auth/login')

    window.location.href = '/auth/login'
  }

  return (
    <Menu {...props}>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  )
}