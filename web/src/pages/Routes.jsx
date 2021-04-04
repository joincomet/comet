import { Redirect, Route, Switch } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import AuthLayout from '@/pages/auth/AuthLayout'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import NotFound from '@/pages/NotFound'
import { useCurrentUser, useCurrentUserLoading } from '@/providers/UserProvider'
import PrivateRoutes from '@/pages/PrivateRoutes'
import { DataProvider } from '@/providers/DataProvider'
import { Helmet } from 'react-helmet-async'

export default function Routes() {
  const user = useCurrentUser()
  const userLoading = useCurrentUserLoading()

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
        <Helmet titleTemplate="%s – Comet" />

        <Route path={['/login', '/register']}>
          <AuthLayout>
            <Switch>
              <Route
                path="/login"
                render={() => {
                  if (userLoading) return null
                  return user ? <Redirect to="/me" /> : <LoginPage />
                }}
              />
              <Route
                path="/register"
                render={() => {
                  if (userLoading) return null
                  return user ? <Redirect to="/me" /> : <RegisterPage />
                }}
              />
            </Switch>
          </AuthLayout>
        </Route>

        <DataProvider>
          <PrivateRoutes />
        </DataProvider>
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}
