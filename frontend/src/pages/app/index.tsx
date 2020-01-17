import React from 'react'

import { useAuthQuery } from 'generated/graphql'
import useRedirect from 'hooks/useRedirect'
import { Switch, Route } from 'react-router-dom'

import AppLayout from 'components/AppLayout'
import Header from './Header'
import Sidebar from './Sidebar'
import ChatRoom from './ChatRoom'

export default () => {
  // redirect use back to login if not authenticated
  const { data } = useAuthQuery()
  useRedirect({
    on: Boolean(data && !data.isAuth),
    to: '/auth/login'
  })

  return (
    <AppLayout
      header={<Header />}
      content={(
        <Switch>
          <Route exact={true} path='/app/room/:id' component={ChatRoom} />
        </Switch>
      )}
      sidebar={<Sidebar />}
    />
  )
}