import React from 'react'

import { Avatar, Typography } from '@material-ui/core'
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg'
import Skeleton from '@material-ui/lab/Skeleton'

interface MessageGroupProps {
  loading?: boolean
  room: any
  groups: any[] | undefined
  me: any
}
const MessageGroup: React.FC<MessageGroupProps> = ({
  loading = false,
  room,
  groups,
  me
}) => {
  if (loading) return (
    <>
      {Array(6).fill(1).map((_: number, index: number) => (
        <div key={index} style={{ width: '45%', marginLeft: index % 2 === 0 ? 'auto' : 'initial' }}>
          {Array(3).fill(1).map((__: number, y: number) => <Skeleton key={y} animation='wave' />)}
        </div>
      ))}
    </>
  )

  const roomUsers = room?.users ?? []
  const roomAdmins = room?.admins ?? []
  const roomName = room?.name ?? ''

  const totalUser = roomUsers.length + roomAdmins.length
  if (!groups?.length) return (
    <div>
      <Avatar style={{ margin: 'auto', width: 60, height: 60, marginBottom: 16, fontSize: '2rem' }}>
        {roomName[0]}
      </Avatar>
      <Typography variant='h6' style={{ textAlign: 'center' }}>
        {roomName}
      </Typography>
      <Typography variant='body1' style={{ textAlign: 'center' }}>
        {totalUser}
        {totalUser > 1 ? ' people ' : ' person '}
        in this room
        </Typography>
    </div>
  )

  return (
    <>
      {groups.map((group: any, index: number) => (
        <ChatMsg
          key={index}
          avatar={group.author.name[0]}
          side={(group.author.id === me.id) ? 'right' : 'left'}
          messages={group.messages}
        />
      ))}
    </>
  )
}

export default MessageGroup