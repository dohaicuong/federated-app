import { Resolvers } from '../generated/graphql'
import { ForbiddenError } from 'apollo-server'

const resolvers: Resolvers = {
  Room: {
    messages: (root, __, { prisma }) => prisma.room({ id: root.id }).messages(),
    adminIds: async (root, __, { prisma }) => {
      const users = await prisma.room({ id: root.id }).users()
      return users
        .filter(user => user.isAdmin)
        .map(user => user.userId)
    },
    userIds: async (root, __, { prisma }) => {
      const users = await prisma.room({ id: root.id }).users()
      return users
        .filter(user => !user.isAdmin)
        .map(user => user.userId)
    },
  },
  Query: {
    room: (_, { id }, { prisma }) => prisma.room({ id }),
    rooms: (_, { userId }, { prisma }) => prisma.rooms({ where: { users_some: { userId } } }),
  },
  Mutation: {
    roomCreate: (_, { input }, { prisma, userId }) => {
      return prisma.createRoom({
        name: input.name,
        users: { create: { userId, isAdmin: true }},
      })
    },
    roomAddPeople: async (_, { input }, { prisma, userId }) => {
      // check if current user is room admin
      const [roomUser] = await prisma.roomUsers({ where: {
        userId,
        room: { id: input.roomId }
      }})
      console.log(roomUser)
      if (!roomUser || !roomUser?.isAdmin) throw new ForbiddenError('You are not allow to add user')

      return prisma.updateRoom({
        where: { id: input.roomId },
        data: { users: { create: { userId: input.userId }}}
      })
    },
    roomRemovePeople: async (_, { input }, { prisma, userId }) => {
      // check if current user is room admin
      const [loggedInUser] = await prisma.roomUsers({
        where: {
          userId,
          room: { id: input.roomId }
        }
      })
      if (!loggedInUser || !loggedInUser?.isAdmin) throw new ForbiddenError('You are not allow to kick this user')

      // check if kicking user is room admin
      const [kickingUser] = await prisma.roomUsers({
        where: {
          userId: input.userId,
          room: { id: input.roomId }
        }
      })
      if (!kickingUser || kickingUser?.isAdmin) throw new ForbiddenError('You are not allow to kick this user')

      return prisma.updateRoom({
        where: { id: input.roomId },
        data: { users: { delete: { id: kickingUser.id } } }
      })
    },
    messageSend: async (_, { input }, { prisma, userId }) => {
      // check if user is in the room
      const [loggedInUser] = await prisma.roomUsers({
        where: {
          userId,
          room: { id: input.roomId }
        }
      })
      if (!loggedInUser) throw new ForbiddenError('You are not in this room')

      return prisma.createMessage({
        authorId: userId,
        room: { connect: { id: input.roomId }},
        content: input.content
      })
    },
    messageDelete: async (_, { input }, { prisma, userId }) => {
      const message = await prisma.message({ id: input.messageId })
      if (message?.authorId !== userId) throw new ForbiddenError('You are not able to delete this message')

      return prisma.deleteMessage({ id: input.messageId })
    }
  }
}

export default resolvers