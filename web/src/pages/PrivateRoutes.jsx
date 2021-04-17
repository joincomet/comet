import { useEffect, useState } from 'react'
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useParams
} from 'react-router-dom'
import SettingsPage from '@/pages/settings/SettingsPage'
import ServerList from '@/components/server/list/ServerList'
import HomeSidebar from '@/pages/me/HomeSidebar'
import FeedPage from '@/pages/me/feed/FeedPage'
import FriendsPage from '@/pages/me/friends/FriendsPage'
import InboxPage from '@/pages/me/inbox/InboxPage'
import UserFolderPage from '@/pages/me/UserFolderPage'
import GroupPage from '@/pages/me/group/GroupPage'
import DmPage from '@/pages/me/dm/DmPage'
import ExplorePage from '@/pages/explore/ExplorePage'
import ServerSidebar from '@/pages/server/ServerSidebar'
import ServerPostsPage from '@/pages/server/ServerPostsPage'
import PostPage from '@/pages/post/PostPage'
import ChannelPage from '@/pages/server/channel/ChannelPage'
import ServerFolderPage from '@/pages/server/ServerFolderPage'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from '@/pages/LoadingScreen'
import ServerLoadingScreen from '@/pages/ServerLoadingScreen'
import { useStore } from '@/hooks/useStore'
import { usePrevious } from 'react-use'
import UserDialog from '@/components/user/UserDialog'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export default function PrivateRoutes() {
  const [user, userLoading] = useCurrentUser()
  const data = {}
  const dataLoading = false

  const setCanGoBack = useStore(s => s.setCanGoBack)
  const [path, setPath] = useState(null)
  const prevPath = usePrevious(path)
  const { pathname } = useLocation()
  useEffect(() => {
    if (prevPath) setCanGoBack(true)
    setPath(pathname)
  }, [pathname])

  return (
    <>
      <AnimatePresence>
        {((user && dataLoading) || (!user && userLoading)) && <LoadingScreen />}
      </AnimatePresence>

      {user && !dataLoading && <UserDialog />}

      <Switch>
        <PrivateRoute path="/settings">
          <SettingsPage />
        </PrivateRoute>
        <PrivateRoute path={['/me', '/explore', '/server']}>
          <ServerList />
          <PrivateRoute path="/me">
            <HomeSidebar />
            <Switch>
              <PrivateRoute path="/me" exact>
                <Redirect to="/me/feed" />
              </PrivateRoute>
              <PrivateRoute path="/me/feed">
                <FeedPage />
              </PrivateRoute>
              <PrivateRoute path="/me/friends">
                <FriendsPage />
              </PrivateRoute>
              <PrivateRoute path="/me/inbox">
                <InboxPage />
              </PrivateRoute>
              <PrivateRoute path="/me/folder/:folderId">
                <UserFolderPage />
              </PrivateRoute>
              <PrivateRoute path="/me/group/:groupId">
                <GroupPage />
              </PrivateRoute>
              <PrivateRoute path="/me/dm/:userId">
                <DmPage />
              </PrivateRoute>
            </Switch>
          </PrivateRoute>
          <PrivateRoute path="/explore">
            <ExplorePage />
          </PrivateRoute>
          <PrivateRoute path="/server/:serverId">
            <ServerRoutes />
          </PrivateRoute>
        </PrivateRoute>
      </Switch>
    </>
  )
}

function ServerRoutes() {
  const { serverId } = useParams()
  const loading = false
  return (
    <>
      <AnimatePresence>{loading && <ServerLoadingScreen />}</AnimatePresence>
      <ServerRoute path="/server/:serverId">
        <ServerSidebar />
        <Switch>
          <ServerRoute path="/server/:serverId" exact>
            <Redirect to={`/server/${serverId}/posts`} />
          </ServerRoute>
          <ServerRoute path="/server/:serverId/posts" exact>
            <ServerPostsPage />
          </ServerRoute>
          <ServerRoute path="/server/:serverId/posts/:postId">
            <PostPage />
          </ServerRoute>
          <ServerRoute path="/server/:serverId/channel/:channelId">
            <ChannelPage />
          </ServerRoute>
          <ServerRoute path="/server/:serverId/folder/:folderId">
            <ServerFolderPage />
          </ServerRoute>
        </Switch>
      </ServerRoute>
    </>
  )
}

function PrivateRoute({ children, ...rest }) {
  const [user, userLoading] = useCurrentUser()
  const dataLoading = false
  return (
    <Route
      {...rest}
      render={() => {
        if (userLoading || dataLoading) return null
        return user ? children : <Redirect to="/login" />
      }}
    />
  )
}

function ServerRoute({ children, ...rest }) {
  const [user, userLoading] = useCurrentUser()
  const dataLoading = false
  const serverLoading = false
  return (
    <Route
      {...rest}
      render={() => {
        if (userLoading || dataLoading || serverLoading) return null
        return user ? children : <Redirect to="/login" />
      }}
    />
  )
}
