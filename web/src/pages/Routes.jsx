import { Suspense, lazy, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import AuthLayout from '@/pages/auth/AuthLayout'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import LoadingScreen from '@/pages/LoadingScreen'
import NotFound from '@/pages/NotFound'

const PrivateRoutes = lazy(() => import('@/pages/PrivateRoutes'))

export default function Routes() {
  const user = useCurrentUser()

  return (
    <Switch>
      <Route path="/" exact>
        <LandingPage />
      </Route>

      <Route
        path={[
          '/login',
          '/register',
          '/settings',
          '/me',
          '/explore',
          '/server'
        ]}
      >
        <Route path={['/login', '/register']}>
          <AuthLayout>
            <Switch>
              <Route
                path="/login"
                render={() => {
                  return user ? <Redirect to="/me" /> : <LoginPage />
                }}
              />
              <Route
                path="/register"
                render={() => {
                  return user ? <Redirect to="/me" /> : <RegisterPage />
                }}
              />
            </Switch>
          </AuthLayout>
        </Route>

        <Suspense fallback={<LoadingScreen />}>
          <PrivateRoutes user={user} />
        </Suspense>
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}
