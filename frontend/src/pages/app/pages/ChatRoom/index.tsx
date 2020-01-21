import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import gql from 'graphql-tag'

import RoomLayout from 'pages/app/layout/RoomLayout'
import MessageGroup from './MessageGroup'
import Chatbar from './Chatbar'
import useScrollTo from 'hooks/useScrollTo'
import useMapDataGroup from './hooks/useMapDataGroup'
import useMessageSubscription from './hooks/useMessageSubscription'

import { useChatRoomQuery } from 'generated/graphql'
import ChatRoomHeader from './ChatRoomHeader'
gql`
  query ChatRoom($id: ID!) {
    me {
      id
    }
    room(id: $id) {
      id
      name
      admins {
        id
      }
      users {
        id
      }
      messages {
        id
        content
        author {
          id
          name
        }
      }
    }
  }
`

export default () => {
  const { push } = useHistory()

  // GET roomId from params
  const { id } = useParams()
  const roomId = id || ''

  // fetch data with params
  const { data, loading, subscribeToMore } = useChatRoomQuery({
    variables: { id: roomId },
    fetchPolicy: 'cache-and-network' // no-cache
  })
  const me = data?.me
  const room = data?.room

  // if room is not found redirect to not found path
  React.useEffect(() => {
    if(!loading && !room) push('/app/notfound')
  }, [room, loading, push])

  // map fetched data
  const groups = useMapDataGroup(data?.room?.messages)

  // subscribe to message when fetching is done
  useMessageSubscription({
    when: !loading,
    subscribe: subscribeToMore,
    variables: { roomId }
  })

  // when message added, deleted, auto scroll to bottom
  const endRef = React.useRef(null)
  const messageLength = data?.room?.messages?.length
  useScrollTo({
    elementRef: endRef,
    when: messageLength
  })

  return (
    <RoomLayout
      header={<ChatRoomHeader roomId={room?.id ?? ''} roomName={room?.name ?? ''} />}
      body={(
        <>
          <MessageGroup
            loading={loading}
            groups={groups}
            room={room}
            me={me}
          />
          <div ref={endRef} />
        </>
      )}
      footer={<Chatbar roomId={roomId} authorId={data?.me?.id ?? ''} />}
    />
  )
}