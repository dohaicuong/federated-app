import React from 'react'
import gql from 'graphql-tag'

const MessageSubscription = gql`
  subscription ChatRoomSubscription($roomId: ID!) {
    messageInRoom(roomId: $roomId) {
      id
      content
      author {
        id
        name
      }
    }
  }
`
interface useMessageSubscriptionProps {
  when: any
  subscribe: any
  variables: any
}
const useMessageSubscription = ({ when, subscribe, variables }: useMessageSubscriptionProps) => {
  React.useEffect(() => {
    if (when) {
      subscribe({
        document: MessageSubscription,
        variables,
        // @ts-ignore
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          console.log(prev)

          // @ts-ignore
          const newMessage = subscriptionData.data.messageInRoom
          const previousMessages = prev.room?.messages ?? []

          if (previousMessages.some((message: any) => message.id === newMessage.id)) return prev

          return {
            ...prev,
            room: {
              ...prev.room,
              messages: [
                ...previousMessages,
                newMessage
              ]
            }
          }
        }
      })
    }
  }, [when, subscribe, variables])
}
export default useMessageSubscription