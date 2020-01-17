import React from 'react'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag'

import { Avatar, Typography, Paper, Grid } from '@material-ui/core'
import Chatbar from './Chatbar'
import MessageGroup from './MessageGroup'

import { useChatRoomQuery } from 'generated/graphql'
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
const MessageSubscription = gql`
  subscription($roomId: ID!) {
    messageInRoom(roomId: $roomId) {
      id
      content
    }
  }
`

export default () => {
  const { id } = useParams()
  const roomId = id || ''
  const { data, loading, subscribeToMore } = useChatRoomQuery({
    variables: { id: roomId },
    fetchPolicy: 'cache-and-network' // no-cache
  })

  const groups = data?.room?.messages?.reduce((total: any, current: any) => {
    const authorId = current.author.id
    const currentGroup = total[total.length - 1]

    if(currentGroup?.authorId !== authorId) {
      total.push({ author: current.author, messages: [current.content] })
    }
    else {
      currentGroup.messages = [
        ...currentGroup.messages,
        current.content
      ]
    }

    return total
  }, [])

  console.log(data)
  React.useEffect(() => {
    if (!loading) {
      subscribeToMore({
        document: MessageSubscription,
        variables: { roomId },
        updateQuery: (prev, { subscriptionData }) => {
          console.log(prev)

          if (!subscriptionData.data) return prev

          return prev
        }
      })
    }
  }, [loading])

  const endRef = React.useRef(null)
  React.useEffect(() => {
    if(data?.room?.messages?.length) {
      const node = endRef.current as any
      if (node) {
        setTimeout(() => node.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    }
  }, [data?.room?.messages?.length])

  return (
    <Grid container direction='column' spacing={0} style={{ height: '100%' }}>
      <Grid item style={{ height: 72 }}>
        <Paper style={{ display: 'flex', alignItems: 'center', padding: 8, marginBottom: 16 }}>
          <Avatar>{data?.room?.name[0]}</Avatar>
          <Typography style={{ marginLeft: 16 }} variant='h5'>
            {data?.room?.name}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs style={{ overflowX: 'hidden', overflowY: 'auto', padding: 10 }}>
        <MessageGroup
          loading={loading}
          groups={groups}
          room={data?.room}
          me={data?.me}
        />
        <div ref={endRef} />
      </Grid>
      <Grid
        item style={{ height: 58 }}
        component={Paper}
        container
        alignItems='center'
        justify='center'
      >
        <Chatbar roomId={roomId} authorId={data?.me?.id ?? ''} />
      </Grid>
    </Grid>
  )
}

