import React from 'react'
import { useHistory } from 'react-router-dom'

interface useRedirectProps {
  to: string
  on: Boolean
}
export default ({ to, on }: useRedirectProps)  => {
  const { push } = useHistory()
  React.useEffect(() => {
    if(on) push(to)
  }, [to, on, push])
}