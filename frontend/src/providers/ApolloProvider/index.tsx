import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import client from './client'

export default ({ children }: any) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}