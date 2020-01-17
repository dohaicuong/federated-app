import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'

import fragmentMatcher from './fragmentMatcher'
import linkError from './links/linkError'
import linkHttp from './links/linkHttp'
import linkWs from './links/linkWs'
import linkRequest from './links/linkRequest'

import resolvers from './localState/resolvers'

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription')
  },
  linkWs,
  linkHttp
)

export default new ApolloClient({
  cache: new InMemoryCache({
    fragmentMatcher,
    dataIdFromObject: o => o.id
  }),
  link: ApolloLink.from([
    linkError,
    linkRequest,
    link,
  ]),
  resolvers,
})