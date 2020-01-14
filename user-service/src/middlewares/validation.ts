import yup, { ValidationError } from 'yup'
import { UserInputError } from 'apollo-server'

export default {
  Mutation: async (resolve: any, root: any, args: any, ctx: any, info: any) => {
    const { validate: validationSchema } = info.schema.getMutationType().getFields()[info.fieldName]
    if (!validationSchema) return resolve(_, args, ctx, info)

    await validationSchema.validate(args, { abortEarly: false })
      .catch((error: ValidationError) => {
        if (!(error instanceof ValidationError)) throw error

        const errors = getErrorsFromYup(error)
        throw new UserInputError('Form Arguments invalid', {
          invalidArgs: errors,
        })
      })

    return resolve(_, args, ctx, info)
  }
}

const getErrorsFromYup = (error: any) => error.inner.reduce((total: any, current: any) => {
  const [root, key] = current.path.split('.')
  if (!total[root]) total[root] = {}

  total[root][key] = current.message.replace(`${current.path} `, '')

  return total
}, {})
