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
import LoadingScreen from '@/pages/LoadingScreen'
import { useStore } from '@/hooks/useStore'
import { usePrevious } from 'react-use'
import UserDialog from '@/components/user/UserDialog'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useMessagesSubscriptions } from '@/hooks/useMessagesSubscriptions'
import BottomBar from '@/components/BottomBar'
import { wsStatus } from '@/graphql/WebSocketLink'

export default function PrivateRoutes() {
  const [user, userLoading] = useCurrentUser()
  useMessagesSubscriptions()

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
      {((!user && userLoading) || wsStatus.status !== 'connected') && (
        <LoadingScreen />
      )}

      {user && <UserDialog />}

      <Switch>
        <PrivateRoute path="/settings">
          <SettingsPage />
        </PrivateRoute>
        <PrivateRoute path={['/me', '/explore', '/server']}>
          <div className="flex flex-grow">
            <ServerList />
            <div className="flex-grow">
              <div className="flex" style={{ height: 'calc(100% - 1.375rem)' }}>
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
              </div>
              <BottomBar />
            </div>
          </div>
        </PrivateRoute>
      </Switch>
    </>
  )
}

function ServerRoutes() {
  const { serverId } = useParams()
  return (
    <>
      <PrivateRoute path="/server/:serverId">
        <ServerSidebar />
        <Switch>
          <PrivateRoute path="/server/:serverId" exact>
            <Redirect to={`/server/${serverId}/posts`} />
          </PrivateRoute>
          <PrivateRoute path="/server/:serverId/posts" exact>
            <ServerPostsPage />
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
    </>
  )
}

function PrivateRoute({ children, ...rest }) {
  const [user, userLoading] = useCurrentUser()
  return (
    <Route
      {...rest}
      render={() => {
        if (userLoading || wsStatus.status !== 'connected') return null
        return user ? children : <Redirect to="/login" />
      }}
    />
  )
}
