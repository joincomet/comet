import React, { useRef } from 'react'
import FoldersSidebar from '@/components/sidebars/FoldersSidebar'
import PostsHeader from '@/components/headers/PostsHeader'
import { useStore } from '@/lib/stores/useStore'
import { useQuery } from 'urql'
import { GET_POSTS } from '@/graphql/queries'
import Container from '@/components/Container'
import View from '@/components/View'
import { useParams } from 'react-router-dom'
import Posts from '@/components/post/Posts'

export default function PostsPage() {
  const { serverId } = useParams()
  const { showFolders } = useStore()

  const ref = useRef(null)

  const refreshPosts = () => {
    if (ref && ref.current) ref.current.refresh()
  }

  return (
    <>
      <PostsHeader refreshPosts={refreshPosts} />
      <FoldersSidebar show={showFolders} />

      <Container rightSidebar={showFolders}>
        <Posts
          variables={{
            joinedOnly: true,
            serverId
          }}
        />
      </Container>
    </>
  )
}
