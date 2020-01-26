import { makeExecutableSchema } from 'apollo-server'

import resolvers from './resolvers'
import typeDefs from './typeDefs'

export default makeExecutableSchema({ typeDefs, resolvers })