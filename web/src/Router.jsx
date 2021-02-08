import React, { useEffect } from 'react'
import {
  CURRENT_USER_QUERY,
  useCurrentUser
} from '@/lib/queries/useCurrentUser'
import { Redirect, Route, Switch } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import HomePage from '@/pages/HomePage'
import ExplorePage from '@/pages/ExplorePage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import AuthLayout from '@/pages/auth/AuthLayout'
import LoadingScreen from '@/components/LoadingScreen'
import { useQuery } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import PlanetPostsPage from '@/pages/planet/[planetName]/PlanetPostsPage'

export default function Router() {
  const { data } = useQuery(CURRENT_USER_QUERY)
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            if (window.electron) {
              if (data && data.currentUser) return <Redirect to="/home" />
              return <Redirect to="/login" />
            } else {
              return <LandingPage />
            }
          }}
        />

        <Route path={['/login', '/register']}>
          <AuthLayout>
            <Switch>
              <Route
                path="/login"
                render={() =>
                  data && data.currentUser ? (
                    <Redirect to="/home" />
                  ) : (
                    <LoginPage />
                  )
                }
              />
              <Route
                path="/register"
                render={() =>
                  data && data.currentUser ? (
                    <Redirect to="/home" />
                  ) : (
                    <RegisterPage />
                  )
                }
              />
            </Switch>
          </AuthLayout>
        </Route>

        <Route>
          <LoadingScreen>
            <Switch>
              <PrivateRoute path="/home">
                <HomePage />
              </PrivateRoute>
              <PrivateRoute path="/explore">
                <ExplorePage />
              </PrivateRoute>
              <PrivateRoute path="/planet/:planetId">
                <PlanetPostsPage />
              </PrivateRoute>
            </Switch>
          </LoadingScreen>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

function PrivateRoute({ children, ...rest }) {
  const { data } = useQuery(CURRENT_USER_QUERY)
  return (
    <Route
      {...rest}
      render={() =>
        data && data.currentUser ? children : <Redirect to="/login" />
      }
    />
  )
}
