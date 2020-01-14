import { gql } from 'apollo-server-express'

export default gql`
  extend type User {
    rooms: [Room!]
  }

  extend type Room {
    admins: [User!]
    users: [User!]
  }

  extend type Message {
    author: User!
  }
`