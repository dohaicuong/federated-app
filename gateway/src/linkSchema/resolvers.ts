import { IResolvers } from 'graphql-tools'

export default (schemas: any): IResolvers => {

  return {
    User: {
      rooms: {
        fragment: `... on User { id }`,
        resolve: (root, args, context, info) => {
          return info.mergeInfo.delegateToSchema({
            schema: schemas.chat,
            operation: 'query',
            fieldName: 'rooms',
            args: {
              userId: root.id
            },
            context,
            info
          })
        }
      }
    },
    Room: {
      admins: {
        fragment: `... on Room { adminIds }`,
        resolve: (root, args, context, info) => {
          return info.mergeInfo.delegateToSchema({
            schema: schemas.user,
            operation: 'query',
            fieldName: 'users',
            args: {
              ids: root.adminIds
            },
            context,
            info
          })
        }
      },
      users: {
        fragment: `... on Room { userIds }`,
        resolve: (root, args, context, info) => {
          return info.mergeInfo.delegateToSchema({
            schema: schemas.user,
            operation: 'query',
            fieldName: 'users',
            args: {
              ids: root.userIds
            },
            context,
            info
          })
        }
      }
    },
    Message: {
      author: {
        fragment: `... on Message { authorId }`,
        resolve: (root, args, context, info) => {
          return info.mergeInfo.delegateToSchema({
            schema: schemas.user,
            operation: 'query',
            fieldName: 'user',
            args: {
              id: root.authorId
            },
            context,
            info
          })
        }
      }
    }
  }
}