import { useRef } from 'react'
import PostsHeader from '@/components/post/PostsHeader'
import Posts from '@/components/post/Posts'
import ServerFoldersSidebar from '@/pages/server/ServerFoldersSidebar'
import { useSetServerPage } from '@/hooks/useSetServerPage'
import Page from '@/components/ui/page/Page'
import CreatePostHeader from '@/components/post/create/CreatePostHeader'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import ChannelUsersSidebar from '@/pages/server/channel/ChannelUsersSidebar'
import { useServerUsersQuery } from '@/graphql/hooks'
import { Helmet } from 'react-helmet-async'

export default function ServerPostsPage({ server }) {
  const [currentUser] = useCurrentUser()
  const ref = useRef(null)

  const refreshPosts = () => {
    if (ref && ref.current) ref.current.refresh()
  }

  const { data } = useServerUsersQuery({
    variables: { serverId: server?.id },
    skip: !server,
    fetchPolicy: 'cache-and-network'
  })
  const serverUsers = data?.serverUsers ?? []

  useSetServerPage(``)

  return (
    <Page
      header={<PostsHeader refreshPosts={refreshPosts} />}
      rightSidebar={
        <ChannelUsersSidebar server={server} serverUsers={serverUsers} />
      }
    >
      <Helmet>
        <title>{server?.displayName}</title>
      </Helmet>
      <Posts
        serverId={server?.id}
        header={currentUser ? <CreatePostHeader server={server} /> : null}
      />
    </Page>
  )
}
