import { useRef } from 'react'
import PostsHeader from '@/components/post/PostsHeader'
import Posts from '@/components/post/Posts'
import ServerFoldersSidebar from '@/pages/server/ServerFoldersSidebar'
import { useSetServerPage } from '@/hooks/useSetServerPage'
import Page from '@/components/ui/page/Page'
import CreatePostHeader from '@/components/post/create/CreatePostHeader'

export default function ServerPostsPage({ server }) {
  const ref = useRef(null)

  const refreshPosts = () => {
    if (ref && ref.current) ref.current.refresh()
  }

  useSetServerPage(`posts`)

  return (
    <Page
      header={<PostsHeader refreshPosts={refreshPosts} />}
      rightSidebar={<ServerFoldersSidebar server={server} />}
    >
      <Posts
        serverId={server?.id}
        header={<CreatePostHeader server={server} />}
      />
    </Page>
  )
}
