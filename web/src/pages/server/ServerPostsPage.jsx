import { useRef } from 'react'
import PostsHeader from '@/components/post/PostsHeader'
import Posts from '@/components/post/Posts'
import ServerFoldersSidebar from '@/pages/server/ServerFoldersSidebar'
import { useSetServerPage } from '@/hooks/useSetServerPage'
import Page from '@/components/ui/page/Page'
import CreatePostHeader from '@/components/post/create/CreatePostHeader'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export default function ServerPostsPage({ server }) {
  const [currentUser] = useCurrentUser()
  const ref = useRef(null)

  const refreshPosts = () => {
    if (ref && ref.current) ref.current.refresh()
  }

  useSetServerPage(``)

  return (
    <Page
      header={<PostsHeader refreshPosts={refreshPosts} />}
      rightSidebar={<ServerFoldersSidebar server={server} />}
    >
      <Posts
        serverId={server?.id}
        header={currentUser ? <CreatePostHeader server={server} /> : null}
      />
    </Page>
  )
}
