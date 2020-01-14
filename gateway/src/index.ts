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
import { ApolloLogExtension } from 'apollo-log'

import services from './serviceList'
import getRemoteSchema from './utils/getRemoteSchema'
import linkTypeDefs from './linkSchema/typeDefs'
import createLinkResolvers from './linkSchema/resolvers'
import { getUserId } from './utils/auth'

;(async () => {
  const schemas = await (await Promise.all(services.map(getRemoteSchema)))
    .reduce((total: any, current) => {
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

  // TODO: Error message format rewrite
  const server = new ApolloServer({
    schema,
    context: async ({ req, connection }: any) => {
      const userId = await getUserId(req.headers.authorization)

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
    ]
  })

  const app = express()
  if (process.env.NODE_ENV !== 'development') {
    app.use(helmet(helmetConfigs))
    app.use(rateLimit(rateLimitConfigs))
  }
  server.applyMiddleware({
    cors: corsConfigs,
    app,
    onHealthCheck: () => new Promise(resolve => resolve())
  })

  app.listen(SERVICE_PORT, () => {
    console.log(`http://localhost:${SERVICE_PORT}${server.graphqlPath}`)
    console.log(`Healthcheck: http://localhost:${SERVICE_PORT}/.well-known/apollo/server-health`)
  })
})()