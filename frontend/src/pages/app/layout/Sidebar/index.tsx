import React from 'react'

import CollapsableList from 'components/CollapsableList'

import gql from 'graphql-tag'
import { useHistory } from 'react-router-dom'
import { IconButton, TextField, InputAdornment, Paper } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import SearchIcon from '@material-ui/icons/Search'

import { useRoomListQuery } from 'generated/graphql'
gql`
  query RoomList {
    me {
      id
      rooms {
        id
        name
      }
    }
  }
`

export default ({ collapsed }: any) => {
  const { data, loading, refetch } = useRoomListQuery()
  const { push, location: { pathname }} = useHistory()
  const currentRoomId = pathname.split('/app/room/')[1]

  React.useEffect(() => {
    setTimeout(() => refetch(), 50)
  }, [refetch])

  const items = React.useMemo(() => data?.me?.rooms?.map(room => ({
    id: room.id,
    title: room.name,
    subtitle: room.name,
    icon: room.name.substring(0, 1)
  })) ?? null, [data])

  const selected = React.useMemo(() => items?.findIndex(item => item.id === currentRoomId), [items, currentRoomId])
  // React.useEffect(() => {
  //   if (currentRoomId !== 'create' && selected === -1 && items?.length) {
  //     const firstRoom = items[0]
  //     push(`/app/room/${firstRoom.id}`)
  //   }
  // }, [currentRoomId, selected, items, push])

  return (
    <>
      <Paper style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px 0' }}>
        {!collapsed && (
          <TextField
            style={{ margin: '0 4px' }}
            variant='outlined'
            size='small'
            fullWidth
            placeholder='Search room'
            InputProps={{
              startAdornment: <InputAdornment position='start'><SearchIcon /></InputAdornment>
            }}
          />
        )}
        <IconButton title='Create room' onClick={() => push(`/app/room/create`)}>
          <CreateIcon />
        </IconButton>
      </Paper>
      <CollapsableList
        items={items}
        isLoading={loading}
        collapsed={collapsed}

        selectedIndex={selected}
        itemOnClick={(room, index) => push(`/app/room/${room.id}`)}
      />
    </>
  )
}