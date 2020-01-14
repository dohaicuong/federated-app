/**
 * ENV CONFIGURATIONS
 */

const {
  JWT_SECRET = 'supersecret',
  SERVICE_PORT = 4000,
  PRISMA_ENDPOINT = 'http://localhost:4466/user-service/'
} = process.env

export { JWT_SECRET, SERVICE_PORT, PRISMA_ENDPOINT }

/**
 * OTHER CONFIGURATIONS
 */