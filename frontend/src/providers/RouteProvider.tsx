import React from 'react'
import { Switch, Route, useHistory, useRouteMatch } from 'react-router-dom'

const routes = [
  { exact: false, path: '/auth', component: React.lazy(() => import('pages/auth')) },
  { exact: false, path: '/app', component: React.lazy(() => import('pages/app')) },
  { exact: true, path: '*', component: React.lazy(() => import('components/NotFound')) },
]

const RouteProvider: React.FC = () => {
  // redirect user to the app root
  const { push } = useHistory()
  const isRoot = useRouteMatch({ path: '/' })
  React.useEffect(() => {
    if(isRoot && isRoot.isExact) push('/app')
  }, [isRoot, push])

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

export default RouteProvider