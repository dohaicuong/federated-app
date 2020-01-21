import React from 'react'
import { Avatar, Typography, IconButton, makeStyles } from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

import AddUserDialog from './AddUserDialog'

interface ChatRoomHeaderProps {
  roomId: string
  roomName: string
}
const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({ roomId, roomName }) => {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const handleAddUserPopupOpen = () => setOpen(true)
  const handleAddUserPopupClose = () => setOpen(false)

  return (
    <>
      <Avatar>{roomName && roomName[0]}</Avatar>
      <Typography className={classes.headerRoomName} variant='h5'>
        {roomName && roomName}
      </Typography>
      <div className={classes.headerFlexPadding} />
      <IconButton title='Adding people' onClick={handleAddUserPopupOpen}>
        <PersonAddIcon />
      </IconButton>

      <AddUserDialog open={open} onClose={handleAddUserPopupClose} roomId={roomId} />
    </>
  )
}

export default ChatRoomHeader

const useStyles = makeStyles({
  headerRoomName: {
    marginLeft: 16
  },
  headerFlexPadding: {
    flexGrow: 1
  }
})