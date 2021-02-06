import React from 'react'
import { useCurrentUser } from '@comet/core/queries/useCurrentUser'
import { Redirect, Route, Switch } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import HomePage from '@/pages/HomePage'
import ExplorePage from '@/pages/ExplorePage'
import LoginPage from '@/pages/login/LoginPage'
import RegisterPage from '@/pages/login/RegisterPage'
import LoginLayout from '@/pages/LoginLayout'

export default function Routes() {
  const user = useCurrentUser().data
  return (
    <Switch>
      <Route>
        <LoginLayout>
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
        </LoginLayout>
      </Route>

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
    </Switch>
  )
}

function PrivateRoute({ children, ...rest }) {
  const user = useCurrentUser().data
  return (
    <Route
      {...rest}
      render={() => (user ? children : <Redirect to="/login" />)}
    />
  )
}
