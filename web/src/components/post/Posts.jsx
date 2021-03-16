import Post from '@/components/post/Post'
import React from 'react'
import { Virtuoso } from 'react-virtuoso'
import { useQuery } from 'urql'
import { GET_POSTS } from '@/graphql/queries'

export default function Posts({
  variables,
  showServerName = false,
  forceExpand = false
}) {
  const [{ data }] = useQuery({ query: GET_POSTS, variables })
  const posts = data?.getPosts?.posts || []

  return (
    <Virtuoso
      overscan={500}
      data={posts}
      className="scrollbar-thin scrollbar-thumb-gray-850 scrollbar-track-gray-775 scrollbar-thumb-rounded-md mr-1"
      itemContent={(index, post) => (
        <Post
          postData={post}
          showServerName={showServerName}
          forceExpand={forceExpand}
        />
      )}
    />
  )
}
