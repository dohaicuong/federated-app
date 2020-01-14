import resolvers from '../resolvers'
import auth from '../../utils/auth'

const login = resolvers.Mutation?.login as any
const mockData = {
  email: 'email@email.com',
  password: 'password',
}

describe('test login mutation', () => {
  it('should throw error when user is not exist', async () => {
    const mockPrisma = {
      user: () => null
    }

    await login(null, { data: mockData }, { prisma: mockPrisma })
      .catch((err: any) => {
        expect(err.extensions.code).toBe('UNAUTHENTICATED')
      })
  })
  it('should throw error when password is wrong', async () => {
    const hashedPassword = await auth.hashPassword('some_wrong_password')
    const mockPrisma = {
      user: (data: any) => {
        return {
          ...data,
          id: 'SOME_USER_ID',
          password: hashedPassword
        }
      }
    }

    await login(null, { data: mockData }, { prisma: mockPrisma })
      .catch((err: any) => {
        expect(err.extensions.code).toBe('UNAUTHENTICATED')
      })
  })
  it('should return token and user', async () => {
    const hashedPassword = await auth.hashPassword(mockData.password)
    const mockPrisma = {
      user: (data: any) => {
        return {
          ...mockData,
          id: 'SOME_USER_ID',
          password: hashedPassword
        }
      }
    }

    const res = await login(null, { data: mockData }, { prisma: mockPrisma })

    expect(res).toHaveProperty('token')
    expect(res).toHaveProperty('user')
    expect(res.user.email).toBe(mockData.email)
  })
})
