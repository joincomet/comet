import { Switch, Redirect, useParams, Route } from 'react-router-dom'
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
import ServerChannelPage from '@/pages/server/channel/ServerChannelPage'
import ServerFolderPage from '@/pages/server/ServerFolderPage'

export default function PrivateRoutes({ user }) {
  const { serverId } = useParams()
  return (
    <Switch>
      <PrivateRoute user={user} path="/settings">
        <SettingsPage />
      </PrivateRoute>
      <PrivateRoute user={user} path={['/me', '/explore', '/server']}>
        <ServerList />
        <PrivateRoute user={user} path="/me">
          <HomeSidebar />
          <Switch>
            <PrivateRoute user={user} path="/me" exact>
              <Redirect to="/me/feed" />
            </PrivateRoute>
            <PrivateRoute user={user} path="/me/feed">
              <FeedPage />
            </PrivateRoute>
            <PrivateRoute user={user} path="/me/friends">
              <FriendsPage />
            </PrivateRoute>
            <PrivateRoute user={user} path="/me/inbox">
              <InboxPage />
            </PrivateRoute>
            <PrivateRoute user={user} path="/me/folder/:folderId">
              <UserFolderPage />
            </PrivateRoute>
            <PrivateRoute user={user} path="/me/group/:groupId">
              <GroupPage />
            </PrivateRoute>
            <PrivateRoute user={user} path="/me/dm/:userId">
              <DmPage />
            </PrivateRoute>
          </Switch>
        </PrivateRoute>
        <PrivateRoute user={user} path="/explore">
          <ExplorePage />
        </PrivateRoute>
        <PrivateRoute user={user} path="/server/:serverId">
          <ServerSidebar />
          <Switch>
            <PrivateRoute user={user} path="/server/:serverId" exact>
              <Redirect to={`/server/${serverId}/posts`} />
            </PrivateRoute>
            <PrivateRoute user={user} path="/server/:serverId/posts" exact>
              <ServerPostsPage />
            </PrivateRoute>
            <PrivateRoute user={user} path="/server/:serverId/posts/:postId">
              <PostPage />
            </PrivateRoute>
            <PrivateRoute
              user={user}
              path="/server/:serverId/channel/:channelId"
            >
              <ServerChannelPage />
            </PrivateRoute>
            <PrivateRoute user={user} path="/server/:serverId/folder/:folderId">
              <ServerFolderPage />
            </PrivateRoute>
          </Switch>
        </PrivateRoute>
      </PrivateRoute>
    </Switch>
  )
}

function PrivateRoute({ user, children, ...rest }) {
  return <Route {...rest}>{user ? children : <Redirect to="/login" />}</Route>
}
