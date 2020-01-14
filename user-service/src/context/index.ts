import { prisma, Prisma, User } from '../generated/prisma-client'
import { IncomingMessage, ServerResponse } from 'http'

export interface Request {
  req: IncomingMessage
  res: ServerResponse
}
export interface Context {
  prisma: Prisma
  user: User | null
}

export const createContext = async ({ req, res }: Request): Promise<Context> => {
  const userId = req.headers?.userid as string | undefined
  const user = userId
    ? await prisma.user({ id: userId })
    : null

  return { prisma, user }
}