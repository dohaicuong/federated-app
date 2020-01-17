import { ApolloLink, Observable } from 'apollo-link'

const request = async (operation: any) => {
  const token = localStorage.ACCESS_TOKEN
  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }
}
const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle: any
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));
    return () => {
      if (handle) handle.unsubscribe();
    }
  })
)
export default requestLink