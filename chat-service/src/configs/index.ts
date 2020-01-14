/**
 * ENV CONFIGURATIONS
 */

const {
  SERVICE_PORT = 4001,
  PRISMA_ENDPOINT = 'http://localhost:4466/chat-service/'
} = process.env

export { SERVICE_PORT, PRISMA_ENDPOINT }

/**
 * OTHER CONFIGURATIONS
 */