import { ApolloServer } from 'apollo-server'
import { SERVICE_PORT } from './configs'
import schema from './schema'
import { createContext } from './context'

const server = new ApolloServer({
  schema,
  context: createContext,
  onHealthCheck: () => new Promise(resolve => resolve())
})

server.listen({ port: SERVICE_PORT }).then(({ url }) => {
  console.log(url)
  console.log(`Healthcheck: ${url}.well-known/apollo/server-health`)
})