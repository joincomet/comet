import React from 'react'
import FoldersSidebar from '@/components/sidebars/FoldersSidebar'
import PostsHeader from '@/components/headers/PostsHeader'
import { useStore } from '@/lib/stores/useStore'
import { useQuery } from 'urql'
import { GET_POSTS } from '@/graphql/queries'
import Post from '@/components/post/Post'
import Container from '@/components/Container'
import View from '@/components/View'
import { useParams } from 'react-router-dom'

export default function PostsPage() {
  const { serverId } = useParams()
  const { showFolders, postsSort, postsTime } = useStore()

  const [{ data }, reexcutePostsQuery] = useQuery({
    query: GET_POSTS,
    variables: {
      joinedOnly: true,
      serverId,
      sort: postsSort,
      time: postsTime
    }
  })
  const posts = data?.getPosts?.posts ?? []

  const refreshPosts = () => {
    reexcutePostsQuery()
  }

  return (
    <>
      <PostsHeader refreshPosts={refreshPosts} />
      <FoldersSidebar show={showFolders} />

      <Container rightSidebar={showFolders}>
        <View>
          {posts.map(post => (
            <Post key={post.id} post={post} showServerName />
          ))}
        </View>
      </Container>
    </>
  )
}
