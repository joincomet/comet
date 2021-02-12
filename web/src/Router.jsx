import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import HomePage from '@/pages/home/HomePage'
import ExplorePage from '@/pages/explore/ExplorePage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import AuthLayout from '@/pages/auth/AuthLayout'
import LoadingScreen from '@/pages/LoadingScreen'
import { BrowserRouter } from 'react-router-dom'
import PlanetPostsPage from '@/pages/planet/PlanetPostsPage'
import { useCurrentUserQuery } from '@/lib/queries'
import PlanetScroller from '@/components/planet-scroller/PlanetScroller'
import HomeLayout from '@/pages/home/HomeLayout'
import PlanetLayout from '@/pages/planet/PlanetLayout'
import GroupPage from '@/pages/group/GroupPage'
import FolderPage from '@/pages/folder/FolderPage'
import PlanetChannelPage from '@/pages/channel/PlanetChannelPage'
import PlanetPostPage from '@/pages/post/PlanetPostPage'
import PlanetFolderPage from '@/pages/folder/PlanetFolderPage'
import NotFound from '@/pages/NotFound'

export default function Router() {
  const [{ data }] = useCurrentUserQuery()
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            if (window.electron) {
              if (data?.currentUser) return <Redirect to="/home" />
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
                  data?.currentUser ? <Redirect to="/home" /> : <LoginPage />
                }
              />
              <Route
                path="/register"
                render={() =>
                  data?.currentUser ? <Redirect to="/home" /> : <RegisterPage />
                }
              />
            </Switch>
          </AuthLayout>
        </Route>

        <Route
          path={[
            '/home',
            '/home/folder/:folderId',
            '/home/chat/:groupId',
            '/explore',
            '/planet/:planetId',
            '/planet/:planetId/channel/:channelId',
            '/planet/:planetId/post/:postId',
            '/planet/:planetId/folder/:folderId'
          ]}
          exact
        >
          <LoadingScreen>
            <PlanetScroller />
            <Switch>
              <PrivateRoute path="/home">
                <HomeLayout>
                  <Switch>
                    <PrivateRoute path="/home" exact>
                      <HomePage />
                    </PrivateRoute>
                    <PrivateRoute path="/home/folder/:folderId">
                      <FolderPage />
                    </PrivateRoute>
                    <PrivateRoute path="/home/chat/:groupId">
                      <GroupPage />
                    </PrivateRoute>
                  </Switch>
                </HomeLayout>
              </PrivateRoute>
              <PrivateRoute path="/explore">
                <ExplorePage />
              </PrivateRoute>
              <PrivateRoute path="/planet/:planetId">
                <PlanetLayout>
                  <Switch>
                    <PrivateRoute path="/planet/:planetId" exact>
                      <PlanetPostsPage />
                    </PrivateRoute>
                    <PrivateRoute path="/planet/:planetId/channel/:channelId">
                      <PlanetChannelPage />
                    </PrivateRoute>
                    <PrivateRoute path="/planet/:planetId/post/:postId">
                      <PlanetPostPage />
                    </PrivateRoute>
                    <PrivateRoute path="/planet/:planetId/folder/:folderId">
                      <PlanetFolderPage />
                    </PrivateRoute>
                  </Switch>
                </PlanetLayout>
              </PrivateRoute>
            </Switch>
          </LoadingScreen>
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

function PrivateRoute({ children, ...rest }) {
  const [{ data }] = useCurrentUserQuery()
  return (
    <Route
      {...rest}
      render={() => (data?.currentUser ? children : <Redirect to="/login" />)}
    />
  )
}
