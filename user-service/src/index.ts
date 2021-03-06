import { SERVICE_PORT } from './configs'

// Apollo server setup
import { ApolloServer } from 'apollo-server'
// import { applyMiddleware } from 'graphql-middleware'

import { createContext } from './context'
import schema from './schema'
// import middlewares from './middlewares'
// const schemaWithMiddlewares = applyMiddleware(schema, ...middlewares)

const server = new ApolloServer({
  schema,
  context: createContext,
  onHealthCheck: () => new Promise(resolve => resolve())
})

server.listen({ port: SERVICE_PORT }).then(({ url }) => {
  console.log(url)
  console.log(`Healthcheck: ${url}.well-known/apollo/server-health`)
})