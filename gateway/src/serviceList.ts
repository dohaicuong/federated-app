export default [
  // { name: 'user', endpoint: 'http://localhost:4000/' },
  // { name: 'chat', endpoint: 'http://localhost:4001/' },
  { name: 'user', endpoint: 'http://user-service:4000/' },
  { name: 'chat', endpoint: 'http://chat-service:4001/', subscription: 'ws://chat-service:4001/graphql' },
]