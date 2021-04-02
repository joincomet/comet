import { useRef } from 'react'
import UserFoldersSidebar from '@/pages/me/feed/UserFoldersSidebar'
import PostsHeader from '@/components/post/PostsHeader'
import { useStore } from '@/hooks/useStore'
import Container from '@/components/ui/Container'
import Posts from '@/components/post/Posts'

export default function FeedPage() {
  const { showFolders } = useStore()

  const ref = useRef(null)

  const refreshPosts = () => {
    if (ref && ref.current) ref.current.refresh()
  }

  return (
    <>
      <PostsHeader refreshPosts={refreshPosts} />
      <UserFoldersSidebar show={showFolders} />

      <Container rightSidebar={showFolders}>
        <Posts showServerName />
      </Container>
    </>
  )
}
