import React from 'react'

import { Switch, Route } from 'react-router-dom'
import { useAuthQuery } from 'generated/graphql'
import useRedirect from 'hooks/useRedirect'

const routes = [
  { exact: true, path: '/auth/login', component: React.lazy(() => import('./Login')) },
  { exact: true, path: '/auth/signup', component: React.lazy(() => import('./Signup')) },
]
const User: React.FC = () => {
  // if already authenticated then redirect user to the app
  const { data } = useAuthQuery()
  useRedirect({
    on: Boolean(data?.isAuth),
    to: '/app'
  })

  return (
    <React.Suspense fallback={null}>
      <Switch>
        {routes.map(route => (
          <Route key={route.path} {...route} />
        ))}
      </Switch>
    </React.Suspense>
  )
}

export default User