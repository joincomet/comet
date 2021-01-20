import { usePosts } from '@/lib/queries/usePosts'
import Post from '@/components/post/Post'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Scrollbar } from 'react-scrollbars-custom'
import React from 'react'
import PageNavigator from '@/components/layout/PageNavigator'

export default function ClassicPosts({ variables, hidePlanet = false }) {
  const { data, isLoading } = usePosts(variables)
  const posts = data ? data.posts : []

  return (
    <AutoSizer disableWidth>
      {({ height }) => (
        <Scrollbar style={{ width: '100%', height }}>
          <div className="md:rounded-xl dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
            {posts.map(post => (
              <Post key={post.id} postData={post} hidePlanet={hidePlanet} />
            ))}
          </div>
          <PageNavigator nextEnabled={!!data.nextPage} />
        </Scrollbar>
      )}
    </AutoSizer>
  )
}
