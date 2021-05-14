import { Redirect, Route, Switch } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import NotFound from '@/pages/NotFound'
import { Helmet } from 'react-helmet-async'
import FeedPage from '@/pages/me/feed/FeedPage'
import FriendsPage from '@/pages/me/friends/FriendsPage'
import ExplorePage from '@/pages/explore/ExplorePage'
import InboxPage from '@/pages/me/inbox/InboxPage'
import UserFolderPage from '@/pages/me/UserFolderPage'
import DmPage from '@/pages/me/dm/DmPage'
import GroupPage from '@/pages/me/group/GroupPage'
import ServerPostsPage from '@/pages/server/ServerPostsPage'
import ServerFolderPage from '@/pages/server/ServerFolderPage'
import PostPage from '@/pages/post/PostPage'
import HomeSidebar from '@/pages/me/HomeSidebar'
import ServerList from '@/components/server/list/ServerList'
import BottomBar from '@/components/BottomBar'

export default function Routes() {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => {
          if (window.electron) {
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
              <Route path="/:server(\+[A-Za-z0-9-_]+)" exact>
                <ServerPostsPage />
              </Route>
              <Route path="/:server(\+[A-Za-z0-9-_]+)/folder/:folderId">
                <ServerFolderPage />
              </Route>
              <Route path="/:server(\+[A-Za-z0-9-_]+)/post/:postId">
                <PostPage />
              </Route>
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
                <UserFolderPage />
              </Route>
              <Route path="/dm/:username(@[A-Za-z0-9-_]+)">
                <DmPage />
              </Route>
              <Route path="/group/:groupId">
                <GroupPage />
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
