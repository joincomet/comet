import {
  matchPath,
  Route,
  Switch,
  useLocation,
  useParams
} from 'react-router-dom'
import NotFound from '@/pages/NotFound'
import FeedPage from '@/pages/feed/FeedPage'
import FriendsPage from '@/pages/friends/FriendsPage'
import ExplorePage from '@/pages/explore/ExplorePage'
import InboxPage from '@/pages/inbox/InboxPage'
import DmPage from '@/pages/dm/DmPage'
import ServerPostsPage from '@/pages/server/ServerPostsPage'
import PostPage from '@/pages/post/PostPage'
import HomeSidebar from '@/pages/HomeSidebar'
import ServerList from '@/components/server/list/ServerList'
import BottomBar from '@/components/BottomBar'
import ServerSidebar from '@/pages/server/ServerSidebar'
import ChannelPage from '@/pages/server/channel/ChannelPage'
import { useServerQuery } from '@/graphql/hooks'
import { useMessagesSubscriptions } from '@/hooks/useMessagesSubscriptions'

const serverRegex = `\\+[A-Za-z0-9_]+`
const usernameRegex = `@[A-Za-z0-9-_]+`

export default function Routes() {
  useMessagesSubscriptions()
  const { pathname } = useLocation()

  const matchedDm = matchPath(pathname, {
    path: '/dm/:username'
  })
  const username = matchedDm?.params?.username?.substring(1)

  return (
    <Switch>
      <Route path="/">
        <Switch>
          <Route
            path={[
              '/',
              '/friends',
              '/inbox',
              `/dm/:username(${usernameRegex})`,
              `/:server(${serverRegex})`,
              `/:server(${serverRegex})/post/:postId`,
              `/:server(${serverRegex})/post/:postId/:slug`,
              '/explore'
            ]}
            exact
          >
            <div className="flex-grow">
              <div
                className="flex h-full"
                style={{ height: 'calc(100% - 1.375rem)' }}
              >
                <ServerList />
                <Route path="/explore">
                  <ExplorePage />
                </Route>
                <Route path={`/:server(${serverRegex})`}>
                  <ServerRoutes />
                </Route>
                <Route
                  exact
                  path={[
                    '/',
                    '/friends',
                    '/inbox',
                    `/dm/:username(${usernameRegex})`
                  ]}
                >
                  <HomeSidebar />
                  <Route path="/" exact>
                    <FeedPage />
                  </Route>
                  <Route path="/friends">
                    <FriendsPage />
                  </Route>
                  <Route path="/inbox">
                    <InboxPage />
                  </Route>
                  <Route path={`/dm/:username(${usernameRegex})`}>
                    <DmPage username={username} />
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
      </Route>
    </Switch>
  )
}

function ServerRoutes() {
  const { server: s } = useParams()
  const serverName = s.substring(1)
  const { data: serverData } = useServerQuery({
    variables: { name: serverName },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  })
  const server = serverData?.server

  const { hash, pathname } = useLocation()
  const channelName = hash.substring(1)
  const channel = (server?.channels ?? []).find(c => c.name === channelName)

  const matchedPost = matchPath(pathname, {
    path: '/:server/post/:postId'
  })
  const postId = matchedPost?.params?.postId

  return (
    <>
      <ServerSidebar server={server} />
      <Route
        path={`/:server(${serverRegex})`}
        exact
        render={({ location }) =>
          location.hash ? (
            <ChannelPage server={server} channel={channel} />
          ) : (
            <ServerPostsPage server={server} />
          )
        }
      />
      <Route
        path={[
          `/:server(${serverRegex})/post/:postId`,
          `/:server(${serverRegex})/post/:postId/:slug`
        ]}
      >
        <PostPage server={server} postId={postId} />
      </Route>
    </>
  )
}
