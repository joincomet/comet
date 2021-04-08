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
import LoadingScreen from '@/pages/LoadingScreen'
import UserDialog from '@/components/user/UserDialog'
import { DndProvider } from 'react-dnd'
import ContextMenuProvider from '@/providers/ContextMenuProvider'

export default function Routes() {
  const user = useCurrentUser()
  const userLoading = useCurrentUserLoading()

  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => {
          if (window.electron) {
            if (userLoading) return <LoadingScreen />
            if (user) return <Redirect to="/me" />
            return <Redirect to="/login" />
          } else {
            return <LandingPage />
          }
        }}
      />

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
          <ContextMenuProvider>
            <PrivateRoutes />
          </ContextMenuProvider>
        </DataProvider>
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}
