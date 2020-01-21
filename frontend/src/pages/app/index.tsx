import React from 'react'

import { useAuthQuery } from 'generated/graphql'
import useRedirect from 'hooks/useRedirect'
import { Switch, Route } from 'react-router-dom'

import AppLayout from 'components/AppLayout'
import Header from './layout/Header'
import Sidebar from './layout/Sidebar'

import CreateRoom from './pages/CreateRoom'
import ChatRoom from './pages/ChatRoom'
import NotFound from 'components/NotFound'

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
          <Route exact={true} path='/app/room/create' component={CreateRoom} />
          <Route exact={true} path='/app/room/:id' component={ChatRoom} />
          <Route exact={true} path='*' component={NotFound} />
        </Switch>
      )}
      sidebar={<Sidebar />}
    />
  )
}