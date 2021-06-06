import PostsHeader from '@/components/post/PostsHeader'
import Posts from '@/components/post/Posts'
import { useSetServerPage } from '@/hooks/useSetServerPage'
import Page from '@/components/ui/page/Page'
import CreatePostHeader from '@/components/post/create/CreatePostHeader'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import ChannelUsersSidebar from '@/pages/server/channel/ChannelUsersSidebar'
import { Helmet } from 'react-helmet-async'
import { useCurrentServer } from '@/hooks/graphql/useCurrentServer'

export default function ServerPostsPage() {
  const { server, users: serverUsers } = useCurrentServer()
  const [currentUser] = useCurrentUser()

  useSetServerPage(``)

  return (
    <Page
      header={<PostsHeader />}
      rightSidebar={
        <ChannelUsersSidebar server={server} serverUsers={serverUsers} />
      }
    >
      <Helmet>
        <title>{server?.displayName}</title>
      </Helmet>
      <Posts
        serverId={server?.id}
        header={currentUser ? <CreatePostHeader server={server} /> : <div className="h-4" />}
      />
    </Page>
  )
}
