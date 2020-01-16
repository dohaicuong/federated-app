import {
  SERVICE_PORT,
  rateLimitConfigs,
  helmetConfigs,
  corsConfigs
} from './configs'

import { ApolloServer } from 'apollo-server-express'
import { mergeSchemas } from 'graphql-tools'
import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import http from 'http'
// import { ApolloLogExtension } from 'apollo-log'

import services from './serviceList'
import getRemoteSchema from './utils/getRemoteSchema'
import linkTypeDefs from './linkSchema/typeDefs'
import createLinkResolvers from './linkSchema/resolvers'
import { getUserId } from './utils/auth'

;(async () => {
  const schemas = await (await Promise.all(services.map(getRemoteSchema)))
    .reduce((total: any, current: any) => {
      total[current.name] = current.schema
      return total
    }, {}) as any

  const arraySchema = Object.values(schemas) as any
  const schema = mergeSchemas({
    schemas: [
      ...arraySchema,
      linkTypeDefs
    ],
    resolvers: createLinkResolvers(schemas)
  })

  const server = new ApolloServer({
    schema,
    context: async ({ req, connection }: any) => {
      const authorization = req
        ? req.headers.authorization
        : connection.context.Authorization ? connection.context.Authorization : connection.context.authorization
      const userId = await getUserId(authorization)

      return { userId }
    },
    extensions: [
      // () => new ApolloLogExtension({
      //   level: 'info',
      //   timestamp: true,
      //   mutate: (level, data) => {
      //     console.log(data)
      //   },
      // })
    ],
    formatError: error => {
      // Pull out the error returned from inner services
      const errorPadding = 'Unexpected error value: '
      if (error.message.includes(errorPadding)) {
        const innerMessage = error.message
          .replace(errorPadding, '')
          .split(',')
          .find(group => group.includes('message'))
          ?.split('"')
          .find(group => !group.includes('message'))
        const message = innerMessage || error.message

        return {
          ...error,
          message,
        }
      }

      return error
    }
  })

  const app = express()
  if (process.env.NODE_ENV !== 'development') {
    app.use(helmet(helmetConfigs))
    app.use(rateLimit(rateLimitConfigs))
  }
  server.applyMiddleware({
    cors: corsConfigs,
    app,
    onHealthCheck: () => new Promise(resolve => resolve()),
  })

  const httpServer = http.createServer(app)
  server.installSubscriptionHandlers(httpServer)

  httpServer.listen(SERVICE_PORT, () => {
    console.log(`🚀 API: http://localhost:${SERVICE_PORT}${server.graphqlPath}`)
    console.log(`🚀 Healthcheck: http://localhost:${SERVICE_PORT}/.well-known/apollo/server-health`)
    console.log(`🚀 Subscriptions: ws://localhost:${SERVICE_PORT}${server.subscriptionsPath}`)
  })
})()