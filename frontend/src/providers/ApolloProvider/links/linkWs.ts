import { WebSocketLink } from 'apollo-link-ws'

export default new WebSocketLink({
  uri: process.env.REACT_APP_SUBSCRIPTION_ENDPOINT || 'ws://localhost:5000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      authorization: `Bearer ${localStorage.ACCESS_TOKEN}`
    },
  }
})