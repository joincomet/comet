import React from 'react'
import { useCurrentUser } from '@comet/core/queries/useCurrentUser'
import { Redirect, Route, Switch } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import HomePage from '@/pages/HomePage'
import ExplorePage from '@/pages/ExplorePage'
import LoginPage from '@/pages/login/LoginPage'

export default function Routes() {
  const user = useCurrentUser().data
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
      <Route
        path="/login"
        render={() => (user ? <Redirect to="/home" /> : <LoginPage />)}
      />
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
