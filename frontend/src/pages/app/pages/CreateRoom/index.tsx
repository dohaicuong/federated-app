import React from 'react'

import RoomLayout from 'pages/app/layout/RoomLayout'
import { Formik, Form } from 'formik'
import TextField from 'components/Formik/TextField'
import { Button } from '@material-ui/core'
import gql from 'graphql-tag'
import { useCreateRoomMutation } from 'generated/graphql'
import { useHistory } from 'react-router-dom'
gql`
  mutation CreateRoom($input: RoomCreateInput!) {
    roomCreate(input: $input) {
      id
      name
    }
  }
`

const CreateRoom = () => {
  const [createRoom] = useCreateRoomMutation()
  const { push } = useHistory()

  return (
    <RoomLayout
      header={(
        <Formik
          initialValues={{ input: { name: '' }}}
          onSubmit={async values => {
            const res = await createRoom({
              variables: values,
              update: (cache, { data }) => {
                const GetRoomListQuery = gql`
                  query GetRoomList {
                    me {
                      id
                      rooms {
                        id
                        name
                      }
                    }
                  }
                `

                const roomListData = cache.readQuery({
                  query: GetRoomListQuery,
                }) as any

                const roomList = roomListData?.me?.rooms ?? []
                const newRoom = {
                  __typename: 'Room',
                  id: data?.roomCreate.id,
                  name: data?.roomCreate.name,
                }

                cache.writeQuery({
                  query: GetRoomListQuery,
                  data: {
                    me: {
                      __typename: 'User',
                      id: roomListData?.me?.id,
                      rooms: [
                        ...roomList,
                        newRoom
                      ]
                    }
                  }
                })
              }
            })

            const roomId = res.data?.roomCreate.id
            if (roomId) {
              push(`/app/room/${roomId}`)
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span style={{ marginRight: 8 }}>
                New room:
              </span>
              <TextField name='input.name' placeholder='type the room name' />
              <Button style={{ marginLeft: 16 }} color='secondary' type='submit' disabled={isSubmitting}>
                Create
              </Button>
            </Form>
          )}
        </Formik>
      )}
    />
  )
}

export default CreateRoom