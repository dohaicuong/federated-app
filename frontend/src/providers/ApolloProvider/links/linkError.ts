import { onError } from 'apollo-link-error'

export default onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) graphQLErrors.forEach(({ message, locations, path }) => {
    window.enqueueSnackbar(message, { variant: 'error' })
  })
  if (networkError) console.log(`[Network error]: ${networkError}`);
})