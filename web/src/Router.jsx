import React, { useEffect } from 'react'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import PostsPage from '@/pages/posts/PostsPage'
import ExplorePage from '@/pages/explore/ExplorePage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import AuthLayout from '@/pages/auth/AuthLayout'
import { BrowserRouter } from 'react-router-dom'
import GroupPage from '@/pages/group/GroupPage'
import UserFolderPage from '@/pages/folder/UserFolderPage'
import NotFound from '@/pages/NotFound'
import { useUser } from '@/components/providers/UserProvider'
import DmPage from '@/pages/dm/DmPage'
import FriendsPage from '@/pages/friends/FriendsPage'
import { ServerDataProvider } from '@/components/providers/ServerDataProvider'
import {
  DataProvider,
  useIsDataFetching
} from '@/components/providers/DataProvider'
import InboxPage from '@/pages/inbox/InboxPage'
import LoadingScreen from '@/pages/LoadingScreen'
import { AnimatePresence } from 'framer-motion'
import ServerList from '@/components/serverlist/ServerList'
import MainSidebar from '@/components/sidebars/HomeSidebar'
import ServerSidebar from '@/components/sidebars/ServerSidebar'
import PostPage from '@/pages/post/PostPage'
import ChannelPage from '@/pages/channel/ChannelPage'
import ServerFolderPage from '@/pages/folder/ServerFolderPage'

export default function Router() {
  const [currentUser, userFetching] = useUser()
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            if (window.electron) {
              if (userFetching) return null
              if (currentUser) return <Redirect to="/posts" />
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
            '/posts',
            '/friends',
            '/inbox',
            '/folder/:folderId',
            '/group/:groupId',
            '/dm/:userId',
            '/explore',
            '/server/:serverId'
          ]}
        >
          <AnimatePresence>{userFetching && <LoadingScreen />}</AnimatePresence>

          <Route path={['/login', '/register']}>
            <AuthLayout>
              <Switch>
                <Route
                  path="/login"
                  render={() => {
                    if (userFetching) return null
                    return currentUser ? (
                      <Redirect to="/posts" />
                    ) : (
                      <LoginPage />
                    )
                  }}
                />
                <Route
                  path="/register"
                  render={() => {
                    if (userFetching) return null
                    return currentUser ? (
                      <Redirect to="/posts" />
                    ) : (
                      <RegisterPage />
                    )
                  }}
                />
              </Switch>
            </AuthLayout>
          </Route>

          <Route
            path={[
              '/posts',
              '/friends',
              '/inbox',
              '/folder/:folderId',
              '/group/:groupId',
              '/dm/:userId',
              '/explore',
              '/server/:serverId'
            ]}
          >
            {userFetching ? (
              <PrivateRoutes userFetching={userFetching} />
            ) : (
              <DataProvider>
                {dataFetching => (
                  <PrivateRoutes
                    userFetching={userFetching}
                    dataFetching={dataFetching}
                  />
                )}
              </DataProvider>
            )}
          </Route>
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

function PrivateRoutes({ userFetching = true, dataFetching = true }) {
  const { serverId } = useParams()
  return (
    <>
      {!userFetching && !dataFetching && <ServerList />}
      <Route
        path={[
          '/posts',
          '/friends',
          '/inbox',
          '/folder/:folderId',
          '/group/:groupId',
          '/dm/:userId'
        ]}
      >
        {!userFetching && !dataFetching && <MainSidebar />}
        <Switch>
          <Route path="/posts" exact>
            {!userFetching && !dataFetching && <PostsPage />}
          </Route>
          <Route path="/friends" exact>
            {!userFetching && !dataFetching && <FriendsPage />}
          </Route>
          <Route path="/inbox" exact>
            {!userFetching && !dataFetching && <InboxPage />}
          </Route>
          <Route path="/folder/:folderId">
            {!userFetching && !dataFetching && <UserFolderPage />}
          </Route>
          <Route path="/group/:groupId">
            {!userFetching && !dataFetching && <GroupPage />}
          </Route>
          <Route path="/dm/:userId">
            {!userFetching && !dataFetching && <DmPage />}
          </Route>
        </Switch>
      </Route>
      <Route path="/explore">
        {!userFetching && !dataFetching && <ExplorePage />}
      </Route>
      <Route path="/server/:serverId">
        <ServerDataProvider>
          {!userFetching && !dataFetching && <ServerSidebar />}
          <Switch>
            <Route path="/server/:serverId" exact>
              <Redirect to={`/server/${serverId}/posts`} />
            </Route>
            <Route path="/server/:serverId/posts" exact>
              {!userFetching && !dataFetching && <PostsPage />}
            </Route>
            <Route path="/server/:serverId/posts/:postId">
              {!userFetching && !dataFetching && <PostPage />}
            </Route>
            <Route path="/server/:serverId/channel/:channelId">
              {!userFetching && !dataFetching && <ChannelPage />}
            </Route>
            <Route path="/server/:serverId/folder/:folderId">
              {!userFetching && !dataFetching && <ServerFolderPage />}
            </Route>
          </Switch>
        </ServerDataProvider>
      </Route>
    </>
  )
}
