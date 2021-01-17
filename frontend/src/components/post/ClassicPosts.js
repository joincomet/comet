import { usePosts } from '@/lib/queries/usePosts'
import { Scrollbars } from 'rc-scrollbars'
import Post from '@/components/post/Post'
import AutoSizer from 'react-virtualized-auto-sizer'
import React from 'react'

export default function ClassicPosts({ variables }) {
  const { data, isLoading } = usePosts(variables)
  const posts = data ? data.posts : []

  return (
    <AutoSizer>
      {({ width, height }) => (
        <Scrollbars style={{ width, height }}>
          <div className="md:rounded-xl dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
            {posts.map(post => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        </Scrollbars>
      )}
    </AutoSizer>
  )
}
