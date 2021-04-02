import { useRef, useEffect } from 'react'
import PostsHeader from '@/components/post/PostsHeader'
import { useStore } from '@/hooks/useStore'
import Container from '@/components/ui/Container'
import { useParams } from 'react-router-dom'
import Posts from '@/components/post/Posts'
import ServerFoldersSidebar from '@/pages/server/ServerFoldersSidebar'
import { useSetServerPage } from '@/hooks/useSetServerPage'

export default function ServerPostsPage() {
  const { serverId } = useParams()
  const showFolders = useStore(s => s.showFolders)

  const ref = useRef(null)

  const refreshPosts = () => {
    if (ref && ref.current) ref.current.refresh()
  }

  useSetServerPage(`posts`)

  return (
    <>
      <PostsHeader refreshPosts={refreshPosts} />
      <ServerFoldersSidebar serverId={serverId} />

      <Container rightSidebar={showFolders}>
        <Posts serverId={serverId} />
      </Container>
    </>
  )
}
