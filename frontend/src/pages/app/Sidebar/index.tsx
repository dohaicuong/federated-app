import React from 'react'

import CollapsableList from 'components/CollapsableList'

import gql from 'graphql-tag'
import { useRoomListQuery } from 'generated/graphql'
import { useHistory } from 'react-router-dom'
gql`
  query RoomList {
    me {
      rooms {
        id
        name
      }
    }
  }
`

export default ({ collapsed }: any) => {
  const { data, loading } = useRoomListQuery({ fetchPolicy: 'no-cache' })
  const { push, location: { pathname }} = useHistory()
  const currentRoomId = pathname.split('/app/room/')[1]

  const items = React.useMemo(() => data?.me?.rooms?.map(room => ({
    id: room.id,
    title: room.name,
    subtitle: room.name,
    icon: room.name.substring(0, 1)
  })) ?? null, [data])

  const selected = React.useMemo(() => items?.findIndex(item => item.id === currentRoomId), [items, currentRoomId])
  React.useEffect(() => {
    if (selected === -1 && items?.length) {
      const firstRoom = items[0]
      push(`/app/room/${firstRoom.id}`)
    }
  }, [selected, items, push])

  return (
    <CollapsableList
      items={items}
      isLoading={loading}
      collapsed={collapsed}

      selectedIndex={selected}
      itemOnClick={(room, index) => push(`/app/room/${room.id}`)}
    />
  )
}