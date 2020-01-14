import { JWT_SECRET } from '../configs'

import jwt from 'jsonwebtoken'

export const getUserId = async (authHeader: string | undefined): Promise<any> => {
  if (!authHeader) return null

  const token = authHeader.replace('Bearer ', '')
  const decoded = await verifyToken(token)
    .catch((error) => console.log(error))
  if (!decoded || (decoded && !decoded.sub)) return null

  return decoded.sub
}

export const verifyToken = (token: string): Promise<any> => new Promise((resolve, reject) => {
  try {
    resolve(jwt.verify(token, JWT_SECRET))
  }
  catch (error) {
    reject(error)
  }
})