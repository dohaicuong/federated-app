import { HttpLink } from 'apollo-link-http'

export default new HttpLink({
  uri: process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000/graphql'
})