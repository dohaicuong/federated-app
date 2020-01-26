import { IResolvers } from 'apollo-server'

export default {
  Query: {
    hello: () => 'world!'
  },
  Subscription: {
    randomNumber: {
      subscribe: (_,__, { pubsub }) => {
        const channel = Math.random().toString(36).substring(2, 15)
        setInterval(() => pubsub.publish(channel, { randomNumber: getRandomInt(100) }), 1000)
        return pubsub.asyncIterator(channel)
      }
    }
  }
} as IResolvers

const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max))