import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import PostsPage from '@/pages/posts/PostsPage'
import ExplorePage from '@/pages/explore/ExplorePage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import AuthLayout from '@/pages/auth/AuthLayout'
import { BrowserRouter } from 'react-router-dom'
import ServerList from '@/components/server-list/ServerList'
import MainLayout from '@/pages/MainLayout'
import ServerLayout from '@/pages/server/ServerLayout'
import GroupPage from '@/pages/group/GroupPage'
import FolderPage from '@/pages/folder/FolderPage'
import NotFound from '@/pages/NotFound'
import { useUser } from '@/components/UserProvider'
import DmPage from '@/pages/dm/DmPage'
import FriendsPage from '@/pages/friends/FriendsPage'
import { ServerDataProvider } from '@/components/ServerDataProvider'
import { DataProvider } from '@/components/DataProvider'

export default function Router() {
  const [currentUser] = useUser()
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            if (window.electron) {
              if (currentUser) return <Redirect to="/posts" />
              return <Redirect to="/login" />
            } else {
              return <LandingPage currentUser={currentUser} />
            }
          }}
        />

        <Route path={['/login', '/register']}>
          <AuthLayout>
            <Switch>
              <Route
                path="/login"
                render={() =>
                  currentUser ? <Redirect to="/posts" /> : <LoginPage />
                }
              />
              <Route
                path="/register"
                render={() =>
                  currentUser ? <Redirect to="/posts" /> : <RegisterPage />
                }
              />
            </Switch>
          </AuthLayout>
        </Route>

        <PrivateRoute
          path={[
            '/posts',
            '/friends',
            '/folder/:folderId',
            '/group/:groupId',
            '/dm/:userId',
            '/explore',
            '/server/:serverId'
          ]}
        >
          <DataProvider>
            <ServerList />
            <Switch>
              <Route
                path={[
                  '/posts',
                  '/friends',
                  '/folder/:folderId',
                  '/group/:groupId',
                  '/dm/:userId'
                ]}
              >
                <MainLayout>
                  <Switch>
                    <Route path="/posts" exact>
                      <PostsPage />
                    </Route>
                    <Route path="/friends" exact>
                      <FriendsPage />
                    </Route>
                    <Route path="/folder/:folderId">
                      <FolderPage />
                    </Route>
                    <Route path="/group/:groupId">
                      <GroupPage />
                    </Route>
                    <Route path="/dm/:userId">
                      <DmPage />
                    </Route>
                  </Switch>
                </MainLayout>
              </Route>
              <Route path="/explore">
                <ExplorePage />
              </Route>
              <Route path="/server/:serverId">
                <ServerDataProvider>
                  <ServerLayout />
                </ServerDataProvider>
              </Route>
            </Switch>
          </DataProvider>
        </PrivateRoute>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

function PrivateRoute({ children, ...rest }) {
  const [currentUser] = useUser()

  return (
    <Route
      {...rest}
      render={() => (currentUser ? children : <Redirect to="/login" />)}
    />
  )
}
