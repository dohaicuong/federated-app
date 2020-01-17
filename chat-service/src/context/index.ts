import { prisma, Prisma } from '../generated/prisma-client'
import { IncomingMessage, ServerResponse } from 'http'

export interface Request {
  req: IncomingMessage
  res: ServerResponse
  connection: any
}
export interface Context {
  prisma: Prisma
  userId?: string
}

export const createContext = async ({ req, connection }: Request): Promise<Context> => {
  const userId = req?.headers?.userid as string ?? undefined
  // console.log(connection)

  return { prisma, userId }
}