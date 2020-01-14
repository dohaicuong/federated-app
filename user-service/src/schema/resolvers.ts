import { Resolvers } from '../generated/graphql'
import { AuthenticationError } from 'apollo-server'
import auth from '../utils/auth'

const resolvers: Resolvers = {
  Query: {
    me: (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Please login')

      return user
    },
    user: (_, { id }, { prisma }) => prisma.user({ id }),
    users: (_, { ids }, { prisma }) => prisma.users({ where: { id_in: ids }}),
  },
  Mutation: {
    signup: async (_, { data: { email, password, ...data } }, { prisma }) => {
      // check existed
      const isExisted = await prisma.$exists.user({ email })
      if (isExisted) throw new AuthenticationError('email existed')

      // hash password
      const hashedPassword = await auth.hashPassword(password)

      // create user
      const user = await prisma.createUser({
        email,
        password: hashedPassword,
        ...data
      })
      // await prisma.createEvent({
      //   type: 'USER_CREATED',
      //   payload: {
      //     email,
      //     password: hashedPassword,
      //     ...data
      //   }
      // })

      // sign token
      const token = auth.signToken({ sub: user.id })

      // return token and user
      return { token, user }
    },
    login: async (_, { data: { email, password }}, { prisma }) => {
      // check user existed
      const user = await prisma.user({ email })
      if (!user) throw new AuthenticationError('Check your credentials')

      // compare password
      const isMatch = await auth.comparePassword(password, user.password)
      if (!isMatch) throw new AuthenticationError('Check your credentials')

      // sign token
      const token = auth.signToken({ sub: user.id })

      // return token and user
      return { token, user }
    },
  },
}

export default resolvers