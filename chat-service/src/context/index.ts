import { prisma, Prisma } from '../generated/prisma-client'
import { IncomingMessage, ServerResponse } from 'http'

export interface Request {
  req: IncomingMessage
  res: ServerResponse
}
export interface Context {
  prisma: Prisma
  userId?: string
}

export const createContext = async ({ req, res }: Request): Promise<Context> => {
  const userId = req.headers.userid as string

  return { prisma, userId }
}