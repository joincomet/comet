import Post from '@/components/post/Post'
import React, { useEffect, useRef, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { useQuery } from 'urql'
import { GET_POSTS } from '@/graphql/queries'
import { useStore } from '@/lib/stores/useStore'

export default function Posts({
  variables,
  showServerName = false,
  forceExpand = false
}) {
  const { postsSort, postsTime } = useStore()
  const [{ data }] = useQuery({
    query: GET_POSTS,
    variables: {
      ...variables,
      sort: postsSort,
      time: postsTime
    }
  })
  const posts = data?.getPosts?.posts || []

  const [key, setKey] = useState(1)

  useEffect(() => setKey(key + 1), [postsSort, postsTime])

  return (
    <Virtuoso
      key={key}
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
