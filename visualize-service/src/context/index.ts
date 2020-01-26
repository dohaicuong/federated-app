import { IncomingMessage, ServerResponse } from 'http'
import { PubSub } from 'graphql-subscriptions'

export interface Request {
  req: IncomingMessage
  res: ServerResponse
  connection: any
}
export interface Context {
  pubsub: PubSub
  userId?: string
}

const pubsub = new PubSub()
export const createContext = async ({ req, connection }: Request): Promise<Context> => {
  const userId = req?.headers?.userid as string ?? undefined

  return { pubsub, userId }
}