import fetch from 'cross-fetch'
import ws from 'ws'

import { introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'
import { SubscriptionClient } from 'subscriptions-transport-ws'

export interface Service {
  name: string
  // introspect: string
  endpoint: string
  subscription?: string
}
export default async ({ name, endpoint, subscription }: Service) => {
  const introspectLink = new HttpLink({ uri: endpoint, fetch })
  const schema = await introspectSchema(introspectLink)

  const httplink = setContext(async (_, previousContext) => {
    if(previousContext.graphqlContext?.userId) {
      const { userId } = previousContext.graphqlContext

      return { headers: { userId }}
    }
  }).concat(new HttpLink({ uri: endpoint, fetch }))

  const wsLink = subscription && new WebSocketLink({
    reconnect: true,
    uri: subscription,
    webSocketImpl: ws
  })

  const link = wsLink
    ? split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription')
      },
      wsLink,
      httplink
    )
    : httplink

  return { name, schema: makeRemoteExecutableSchema({ schema, link })}
}