import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import { useHistory } from 'react-router'

const routes = [
  { exact: false, path: '/auth', component: React.lazy(() => import('pages/auth')) },
  { exact: false, path: '/app', component: React.lazy(() => import('pages/app')) },
  { exact: true, path: '*', component: React.lazy(() => import('components/NotFound')) },
]

const RouteProvider: React.FC = () => {
  // auth hooks check if
  // user is currently auth or not
  // const isAuth = false

  // on the first time loading the page
  // if user is not auth push back to login
  // otherwise push to root
  // const { push } = useHistory()
  // React.useEffect(() => {
  //   if(isAuth) push('/app/cases')
  //   else push('/auth/login')
  // }, [isAuth, push])

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