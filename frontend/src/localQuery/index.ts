import gql from 'graphql-tag'
gql`
  query Auth {
    isAuth @client(always: true)
  }
`