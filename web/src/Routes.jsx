import React, { useEffect } from 'react'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { Redirect, Route, Switch } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import HomePage from '@/pages/HomePage'
import ExplorePage from '@/pages/ExplorePage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import AuthLayout from '@/pages/auth/AuthLayout'

export default function Routes() {
  const user = useCurrentUser()
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => {
          if (user) return <Redirect to="/home" />
          if (window.electron) {
            return <Redirect to="/login" />
          } else {
            return <LandingPage />
          }
        }}
      />

      <PrivateRoute path="/home">
        <HomePage />
      </PrivateRoute>
      <PrivateRoute path="/explore">
        <ExplorePage />
      </PrivateRoute>

      <Route>
        <AuthLayout>
          <Switch>
            <Route
              path="/login"
              render={() => (user ? <Redirect to="/home" /> : <LoginPage />)}
            />
            <Route
              path="/register"
              render={() => (user ? <Redirect to="/home" /> : <RegisterPage />)}
            />
          </Switch>
        </AuthLayout>
      </Route>
    </Switch>
  )
}

function PrivateRoute({ children, ...rest }) {
  const user = useCurrentUser()
  return (
    <Route
      {...rest}
      render={() => (user ? children : <Redirect to="/login" />)}
    />
  )
}
