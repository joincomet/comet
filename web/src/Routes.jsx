import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import PostsPage from '@/pages/posts/PostsPage'
import ExplorePage from '@/pages/explore/ExplorePage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import AuthLayout from '@/pages/auth/AuthLayout'
import GroupPage from '@/pages/group/GroupPage'
import UserFolderPage from '@/pages/folder/UserFolderPage'
import NotFound from '@/pages/NotFound'
import {
  useFetching,
  useUser,
  useUserFetching
} from '@/components/providers/DataProvider'
import DmPage from '@/pages/dm/DmPage'
import FriendsPage from '@/pages/friends/FriendsPage'
import InboxPage from '@/pages/inbox/InboxPage'
import LoadingScreen from '@/pages/LoadingScreen'
import { AnimatePresence } from 'framer-motion'
import ServerList from '@/components/serverlist/ServerList'
import MainSidebar from '@/components/sidebars/HomeSidebar'
import ServerSidebar from '@/components/sidebars/ServerSidebar'
import PostPage from '@/pages/post/PostPage'
import ChannelPage from '@/pages/channel/ChannelPage'
import ServerFolderPage from '@/pages/folder/ServerFolderPage'
import SettingsPage from '@/pages/settings/SettingsPage'

export default function Routes() {
  const user = useUser()
  const userFetching = useUserFetching()
  const fetching = useFetching()

  return (
    <Switch>
      <Route
        path="/"
        exact
      >
        <LandingPage />
      </Route>

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
          '/server/:serverId',
          '/settings'
        ]}
      >
        <AnimatePresence>
          {((!!user && fetching) || (userFetching && !user)) && (
            <LoadingScreen />
          )}
        </AnimatePresence>

        <Route path={['/login', '/register']}>
          <AuthLayout>
            <Switch>
              <Route
                path="/login"
                render={() => {
                  if (userFetching) return null
                  return user ? <Redirect to="/posts" /> : <LoginPage />
                }}
              />
              <Route
                path="/register"
                render={() => {
                  if (userFetching) return null
                  return user ? <Redirect to="/posts" /> : <RegisterPage />
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
            '/server/:serverId',
            '/settings'
          ]}
        >
          <PrivateRoutes />
        </Route>
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

function PrivateRoute({ children, ...rest }) {
  const fetching = useFetching()
  return <Route {...rest}>{!fetching && children}</Route>
}

function PrivateRoutes() {
  const { serverId } = useParams()

  return (
    <>
      <PrivateRoute path="/settings">
        <SettingsPage />
      </PrivateRoute>
      <PrivateRoute
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
        <ServerList />
        <PrivateRoute
          path={[
            '/posts',
            '/friends',
            '/inbox',
            '/folder/:folderId',
            '/group/:groupId',
            '/dm/:userId'
          ]}
        >
          <MainSidebar />
          <Switch>
            <PrivateRoute path="/posts" exact>
              <PostsPage />
            </PrivateRoute>
            <PrivateRoute path="/friends" exact>
              <FriendsPage />
            </PrivateRoute>
            <PrivateRoute path="/inbox" exact>
              <InboxPage />
            </PrivateRoute>
            <PrivateRoute path="/folder/:folderId">
              <UserFolderPage />
            </PrivateRoute>
            <PrivateRoute path="/group/:groupId">
              <GroupPage />
            </PrivateRoute>
            <PrivateRoute path="/dm/:userId">
              <DmPage />
            </PrivateRoute>
          </Switch>
        </PrivateRoute>
        <PrivateRoute path="/explore">
          <ExplorePage />
        </PrivateRoute>
        <PrivateRoute path="/server/:serverId">
          <ServerSidebar />
          <Switch>
            <PrivateRoute path="/server/:serverId" exact>
              <Redirect to={`/server/${serverId}/posts`} />
            </PrivateRoute>
            <PrivateRoute path="/server/:serverId/posts" exact>
              <PostsPage />
            </PrivateRoute>
            <PrivateRoute path="/server/:serverId/posts/:postId">
              <PostPage />
            </PrivateRoute>
            <PrivateRoute path="/server/:serverId/channel/:channelId">
              <ChannelPage />
            </PrivateRoute>
            <PrivateRoute path="/server/:serverId/folder/:folderId">
              <ServerFolderPage />
            </PrivateRoute>
          </Switch>
        </PrivateRoute>
      </PrivateRoute>
    </>
  )
}
