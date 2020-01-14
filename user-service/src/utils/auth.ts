import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../configs'

export default {
  hashPassword: (password: string) => bcrypt.hash(password, 10),
  comparePassword: (password: string, hashed: string) => bcrypt.compare(password, hashed),
  signToken: (payload: string | object | Buffer) => jwt.sign(payload, JWT_SECRET),
  verifyToken: (token: string): Promise<any> => new Promise((resolve, reject) => {
    try {
      resolve(jwt.verify(token, JWT_SECRET))
    }
    catch(error) {
      reject(error)
    }
  })
}