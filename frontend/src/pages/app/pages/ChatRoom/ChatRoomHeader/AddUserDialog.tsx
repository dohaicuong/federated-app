import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import gql from 'graphql-tag'
import { useAddUserDialogDataQuery, useAddUserDialogActionMutation } from 'generated/graphql'
gql`
  query AddUserDialogData {
    users {
      id
      name
      email
      rooms {
        id
      }
    }
  }
`
gql`
  mutation AddUserDialogAction($input: RoomAddPeopleInput!) {
    roomAddPeople(input: $input) {
      users {
        id
        name
        email
        rooms {
          id
        }
      }
    }
  }
`

interface AddUserDialogProps {
  open: boolean
  onClose: () => void
  roomId: string
}
const AddUserDialog: React.FC<AddUserDialogProps> = ({ open, onClose, roomId }) => {
  const [addUser] = useAddUserDialogActionMutation()

  const { data, loading } = useAddUserDialogDataQuery({ skip: !open })
  if (loading) return <>Loading...</>
  const mappedUser = data?.users?.filter(user => {
    const roomIds = user?.rooms?.map(room => room.id) ?? []
    return !roomIds.includes(roomId)
  })

  const handleAddUser = async (userId: string, roomId: string) => {
    await addUser({ variables: { input: { userId, roomId }}})

    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <List style={{ minWidth: 350 }}>
        {mappedUser?.length
          ? mappedUser?.map(user => (
            <ListItem key={user.id}>
              <ListItemAvatar>
                <Avatar>
                  {user.name ? user.name[0] : ''}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => handleAddUser(user.id, roomId)}>
                  <AddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
          : 'Everyone is in your room :)'
        }
      </List>
    </Dialog>
  )
}

export default AddUserDialog