import path from 'path'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas' // mergeResolvers
import { makeExecutableSchema } from 'apollo-server'
import resolvers from './resolvers'
import { IResolvers } from 'graphql-tools'

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema.graphql')), { all: true })
// const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

export default makeExecutableSchema({
  typeDefs,
  resolvers: resolvers as IResolvers
})