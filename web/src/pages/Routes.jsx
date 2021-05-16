import {
  matchPath,
  Redirect,
  Route,
  Switch,
  useLocation,
  useParams
} from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import NotFound from '@/pages/NotFound'
import { Helmet } from 'react-helmet-async'
import FeedPage from '@/pages/feed/FeedPage'
import FriendsPage from '@/pages/friends/FriendsPage'
import ExplorePage from '@/pages/explore/ExplorePage'
import InboxPage from '@/pages/inbox/InboxPage'
import UserFolderPage from '@/pages/UserFolderPage'
import DmPage from '@/pages/dm/DmPage'
import GroupPage from '@/pages/group/GroupPage'
import ServerPostsPage from '@/pages/server/ServerPostsPage'
import ServerFolderPage from '@/pages/server/ServerFolderPage'
import PostPage from '@/pages/post/PostPage'
import HomeSidebar from '@/pages/HomeSidebar'
import ServerList from '@/components/server/list/ServerList'
import BottomBar from '@/components/BottomBar'
import ServerSidebar from '@/pages/server/ServerSidebar'
import ChannelPage from '@/pages/server/channel/ChannelPage'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useServerQuery } from '@/graphql/hooks'

export default function Routes() {
  const [currentUser] = useCurrentUser()
  const { pathname } = useLocation()
  const matchedGroup = matchPath(pathname, {
    path: '/group/:groupId'
  })
  const groupId = matchedGroup?.params?.groupId

  const matchedFolder = matchPath(pathname, {
    path: '/folder/:folderId'
  })
  const folderId = matchedFolder?.params?.folderId

  const matchedDm = matchPath(pathname, {
    path: '/dm/:username'
  })
  const username = matchedFolder?.params?.username?.substring(1)

  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => {
          if (window.electron || !!currentUser) {
            return <Redirect to="/home" />
          } else {
            return <LandingPage />
          }
        }}
      />

      <Route
        path={[
          '/home',
          '/friends',
          '/explore',
          '/inbox',
          '/folder/:folderId',
          '/dm/:username',
          '/group/:groupId',
          '/:server'
        ]}
      >
        <Helmet titleTemplate="%s – Comet" />
        <div className="flex-grow">
          <div
            className="flex h-full"
            style={{ height: 'calc(100% - 1.375rem)' }}
          >
            <ServerList />
            <Route path="/explore">
              <ExplorePage />
            </Route>
            <Route path="/:server(\+[A-Za-z0-9-_]+)">
              <ServerRoutes />
            </Route>
            <Route
              path={[
                '/home',
                '/friends',
                '/inbox',
                '/folder/:folderId',
                '/dm/:username(@[A-Za-z0-9-_]+)',
                '/group/:groupId'
              ]}
            >
              <HomeSidebar />
              <Route path="/home">
                <FeedPage />
              </Route>
              <Route path="/friends">
                <FriendsPage />
              </Route>
              <Route path="/inbox">
                <InboxPage />
              </Route>
              <Route path="/folder/:folderId">
                <UserFolderPage folderId={folderId} />
              </Route>
              <Route path="/dm/:username(@[A-Za-z0-9-_]+)">
                <DmPage username={username} />
              </Route>
              <Route path="/group/:groupId">
                <GroupPage groupId={groupId} />
              </Route>
            </Route>
          </div>
          <BottomBar />
        </div>
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

function ServerRoutes() {
  const { server: s } = useParams()
  const serverName = s.substring(1)
  const { data: serverData } = useServerQuery({
    variables: { name: serverName }
  })
  const server = serverData?.server

  const { hash, pathname } = useLocation()
  const channelName = hash.substring(1)
  const channel = (server?.channels ?? []).find(c => c.name === channelName)

  const matchedFolder = matchPath(pathname, {
    path: '/:server/folder/:folderId'
  })
  const folderId = matchedFolder?.params?.folderId
  const folder = (server?.folders ?? []).find(f => f.id === folderId)

  const matchedPost = matchPath(pathname, {
    path: '/:server/post/:postId'
  })
  const postId = matchedPost?.params?.postId

  return (
    <>
      <ServerSidebar server={server} />
      <Route
        path="/:server(\+[A-Za-z0-9-_]+)"
        exact
        render={({ location }) =>
          location.hash ? (
            <ChannelPage server={server} channel={channel} />
          ) : (
            <ServerPostsPage server={server} />
          )
        }
      />
      <Route path="/:server(\+[A-Za-z0-9-_]+)/folder/:folderId">
        <ServerFolderPage server={server} folder={folder} />
      </Route>
      <Route path="/:server(\+[A-Za-z0-9-_]+)/post/:postId">
        <PostPage server={server} postId={postId} />
      </Route>
    </>
  )
}
