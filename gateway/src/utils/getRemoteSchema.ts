import { introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools'
import { HttpLink } from 'apollo-link-http'
import fetch from 'cross-fetch'
import { setContext } from 'apollo-link-context'

export interface Service {
  name: string
  endpoint: string
}
export default async ({ name, endpoint }: Service) => {
  const introspectLink = new HttpLink({ uri: endpoint, fetch })
  const schema = await introspectSchema(introspectLink)

  const link = setContext(async (_, previousContext) => {
    if(previousContext.graphqlContext?.userId) {
      const { userId } = previousContext.graphqlContext

      return { headers: { userId }}
    }
  }).concat(new HttpLink({ uri: endpoint, fetch }))

  return { name, schema: makeRemoteExecutableSchema({ schema, link }) }
}