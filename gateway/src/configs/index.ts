/**
 * ENV CONFIGURATIONS
 */

const {
  JWT_SECRET = 'supersecret',
  SERVICE_PORT = 5000,
} = process.env

export { JWT_SECRET, SERVICE_PORT }

/**
 * OTHER CONFIGURATIONS
 */

export const rateLimitConfigs = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many accounts from this IP, please try again in 15mins"
}

export const helmetConfigs = {}

export const corsConfigs = true