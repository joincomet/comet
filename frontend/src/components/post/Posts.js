import { usePosts } from '@/lib/queries/usePosts'
import Post from '@/components/post/Post'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Scrollbar } from 'react-scrollbars-custom'
import React from 'react'
import PageNavigator from '@/components/ui/PageNavigator'

export default function Posts({
  variables,
  planet = false,
  embed = false,
  thumbnail = false,
  link = false,
  draggable = false,
  expandable = false
}) {
  const { data, isLoading } = usePosts(variables)
  const posts = data ? data.posts : []

  return (
    <AutoSizer disableWidth>
      {({ height }) => (
        <Scrollbar mobileNative style={{ width: '100%', height }}>
          <div className="lg:rounded-xl dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
            {posts.map(post => (
              <Post
                key={post.id}
                postData={post}
                {...{ planet, embed, thumbnail, link, draggable, expandable }}
              />
            ))}
          </div>
          <PageNavigator nextEnabled={data ? !!data.nextPage : false} />
        </Scrollbar>
      )}
    </AutoSizer>
  )
}
