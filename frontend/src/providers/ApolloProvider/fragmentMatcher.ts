import fragmentResult from 'generated/fragments'
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'

export default new IntrospectionFragmentMatcher({
  introspectionQueryResultData: fragmentResult
})