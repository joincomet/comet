import { useRef } from 'react'
import PostsHeader from '@/components/post/PostsHeader'
import { useParams } from 'react-router-dom'
import Posts from '@/components/post/Posts'
import ServerFoldersSidebar from '@/pages/server/ServerFoldersSidebar'
import { useSetServerPage } from '@/hooks/useSetServerPage'
import Page from '@/components/ui/page/Page'
import CreatePostHeader from '@/components/post/CreatePostHeader'

export default function ServerPostsPage() {
  const { serverId } = useParams()

  const ref = useRef(null)

  const refreshPosts = () => {
    if (ref && ref.current) ref.current.refresh()
  }

  useSetServerPage(`posts`)

  return (
    <Page
      header={<PostsHeader refreshPosts={refreshPosts} />}
      rightSidebar={<ServerFoldersSidebar serverId={serverId} />}
    >
      <Posts serverId={serverId} header={<CreatePostHeader />} />
    </Page>
  )
}
