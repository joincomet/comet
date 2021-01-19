import { usePosts } from '@/lib/queries/usePosts'
import { Scrollbars } from 'rc-scrollbars'
import Post from '@/components/post/Post'
import AutoSizer from 'react-virtualized-auto-sizer'
import React from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import NavLink from '@/components/NavLink'
import { useRouter } from 'next/router'
import PageNavigator from '@/components/layout/PageNavigator'

export default function ClassicPosts({ variables, hidePlanet = false }) {
  const { data, isLoading } = usePosts(variables)
  const posts = data ? data.posts : []

  return (
    <AutoSizer>
      {({ width, height }) => (
        <Scrollbars style={{ width, height }} universal>
          <div className="md:rounded-xl dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
            {posts.map(post => (
              <Post key={post.id} postData={post} hidePlanet={hidePlanet} />
            ))}
          </div>
          <PageNavigator nextEnabled={!!data.nextPage} />
        </Scrollbars>
      )}
    </AutoSizer>
  )
}
