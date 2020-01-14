import resolvers from '../resolvers'
import auth from '../../utils/auth'

const signup = resolvers.Mutation?.signup as any
const mockData = {
  name: 'Yuki',
  email: 'email@email.com',
  password: 'password',
}

describe('test signup mutation', () => {
  it('should throw error when email already exist', async () => {
    const mockPrisma = {
      $exists: {
        user: () => true
      }
    }

    await signup(null, { data: mockData }, { prisma: mockPrisma })
      .catch((err: any) => {
        expect(err.extensions.code).toBe('UNAUTHENTICATED')
      })
  })
  it('should return token and user', async () => {
    const mockPrisma = {
      $exists: {
        user: () => false
      },
      createUser: (data: any) => {
        return {
          ...data,
          id: 'SOME_USER_ID'
        }
      },
      createEvent: () => {}
    }

    const res = await signup(null, { data: mockData }, { prisma: mockPrisma })

    expect(res).toHaveProperty('token')
    expect(res).toHaveProperty('user')

    expect(res.user.email).toBe(mockData.email)
    expect(res.user.name).toBe(mockData.name)
  })
})
