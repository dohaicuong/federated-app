import React from 'react'

import { Formik, Form } from 'formik'
import { Grid, InputAdornment, IconButton, useTheme } from '@material-ui/core'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import GifIcon from '@material-ui/icons/Gif'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import ImageIcon from '@material-ui/icons/Image'
import TextField from 'components/Formik/TextField'

import { useSendMessageMutation } from 'generated/graphql'
import gql from 'graphql-tag'
gql`
  mutation SendMessage($input: MessageSendInput!) {
    messageSend(input: $input) {
      id
      content
      author {
        id
      }
    }
  }
`
const RoomQuery = gql`query Room($id: ID!) { room(id: $id) { id messages { id content }}}`

export interface CharbarProps {
  roomId: string
  authorId: string
}
const Chatbar: React.FC<CharbarProps> = ({ roomId, authorId }) => {
  const handleMoreActions = () => {}
  const handleSendGif = () => {}
  const handleSendSticker = () => {}
  const handleSendFile = () => {}
  const handleSendEmoji = () => {}
  const handleSendLike = () => {}

  const [sendMessage] = useSendMessageMutation()

  return (
    <>
      <ActionButton icon={<AddCircleIcon />} onClick={handleMoreActions} />
      <ActionButton icon={<GifIcon />} onClick={handleSendGif} />
      <ActionButton icon={<InsertDriveFileIcon />} onClick={handleSendSticker} />
      <ActionButton icon={<ImageIcon />} onClick={handleSendFile} />
      <ChatField
        roomId={roomId}
        handleSendEmoji={handleSendEmoji}
        onSubmit={(values, { setSubmitting, resetForm }, inputRef) => {
          setTimeout(() => {
            sendMessage({
              variables: values,
              optimisticResponse: {
                __typename: 'Mutation',
                messageSend: {
                  __typename: 'Message',
                  id: 'temp_ID',
                  content: values.input.content,
                  author: {
                    __typename: 'User',
                    id: authorId
                  }
                }
              },
              update: (cache, { data }) => {
                if (data) {
                  const roomData = cache.readQuery({
                    query: RoomQuery,
                    variables: { id: roomId }
                  }) as any

                  const newMessage = {
                    __typename: 'Message',
                    id: data.messageSend.id,
                    content: data.messageSend.content,
                  }

                  cache.writeQuery({
                    query: RoomQuery,
                    data: {
                      room: {
                        __typename: 'Room',
                        id: roomId,
                        messages: [
                          ...roomData?.room.messages,
                          newMessage,
                        ]
                      }
                    }
                  })
                }
              }
            })

            setSubmitting(false)
            resetForm()
            const inputNode = inputRef?.current as any
            if (inputNode) inputNode.focus()
          }, 400)
        }}
      />
      <ActionButton icon={<ThumbUpIcon />} onClick={handleSendLike} />
    </>
  )
}

export default Chatbar

interface ActionButtonProps {
  icon: React.ReactElement
  onClick?: any
}
const ActionButton: React.FC<ActionButtonProps> = ({ icon, onClick }) => {
  const theme = useTheme()

  return (
    <Grid item style={{ width: 52, display: 'flex', justifyContent: 'center' }}>
      <IconButton onClick={onClick && onClick}>
        {React.cloneElement(icon, { style: { color: theme.palette.primary.main }})}
      </IconButton>
    </Grid>
  )
}

interface ChatFieldProps {
  roomId: string
  onSubmit?: (values: any, helpers: any, inputRef: any) => void
  handleSendEmoji?: any
}
const ChatField: React.FC<ChatFieldProps> = ({ roomId, onSubmit, handleSendEmoji }) => {
  const inputRef = React.useRef(null)

  return (
    <Grid item xs>
      <Formik
        initialValues={{ input: { roomId, content: '' }}}
        onSubmit={(values, helpers) => onSubmit && onSubmit(values, helpers, inputRef)}
      >
        <Form>
          <TextField
            name='input.content'
            inputRef={inputRef}
            autoFocus
            autoComplete='off'
            variant='outlined'
            fullWidth
            placeholder='Jot something...'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleSendEmoji && handleSendEmoji}>
                    <InsertEmoticonIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Form>
      </Formik>
    </Grid>
  )
}