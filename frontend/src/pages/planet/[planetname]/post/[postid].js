import { QueryClient } from 'react-query'
import { fetchPost, usePost } from '@/lib/queries/usePost'
import { useRouter } from 'next/router'
import Post from '@/components/post/Post'
import { fetchComments, useComments } from '@/lib/queries/useComments'
import { FiCopy } from 'react-icons/fi'
import React, { useEffect, useState } from 'react'
import Comment from '@/components/comment/Comment'
import Tippy from '@tippyjs/react'
import { useCopyToClipboard } from 'react-use'
import { dehydrate } from 'react-query/hydration'
import CreateCommentButton from '@/components/comment/create/CreateCommentButton'
import PlanetHeader from '@/components/planet/PlanetHeader'
import UserHeader from '@/components/user/UserHeader'
import InfoLinks from '@/components/InfoLinks'
import NavLink from '@/components/NavLink'
import { NextSeo } from 'next-seo'
import PlanetAbout from '@/components/planet/PlanetAbout'
import UserAbout from '@/components/user/UserAbout'
import { globalPrefetch } from '@/lib/queries/globalPrefetch'
import { fetchPlanet, usePlanet } from '@/lib/queries/usePlanet'
import PlanetSidebar from '@/components/planet/PlanetSidebar'
import FoldersSidebar from '@/components/post/FoldersSidebar'

function PostPage({ postVariables, commentVariables }) {
  const { query, pathname } = useRouter()
  const post = usePost(postVariables).data
  const commentsQuery = useComments(commentVariables)
  const { comments, commentCount } = commentsQuery.data || {
    comments: [],
    commentCount: []
  }
  const [parentComment, setParentComment] = useState(null)

  const planet = usePlanet({ name: query.planetname }).data

  return (
    <>
      <NextSeo
        title={
          post.title
            ? `${post.title} – CometX`
            : `Post by @${post.author.username} – CometX`
        }
        description={
          post.textContent
            ? post.textContent.replace(/(<([^>]+)>)/gi, '')
            : `Submitted ${post.timeSince} by @${post.author.username}`
        }
        openGraph={{
          images: [
            {
              url:
                post.imageUrls && post.imageUrls.length > 0
                  ? post.imageUrls[0]
                  : post.thumbnailUrl
            }
          ]
        }}
      />

      <PlanetSidebar planet={planet} />
      <FoldersSidebar />

      <main
        className="slideout-panel slideout-panel--right slideout-panel--header"
        id="panel"
      >
        <Post postData={post} className="md:rounded" showFullText />

        <div className="">
          {comments.map((comment, index) => (
            <Comment
              comment={comment}
              post={post}
              key={comment.id}
              setParentComment={setParentComment}
            />
          ))}

          {comments.length > 0 && <div className="h-64" />}
        </div>
      </main>
    </>
  )
}

export default PostPage

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  const { query } = ctx

  const k = ['planet', { name: query.planetname }]

  await queryClient.prefetchQuery(k, key => fetchPlanet(key, ctx))

  const planet = queryClient.getQueryData(k)

  if (query.planetname !== planet.name)
    return {
      redirect: {
        destination: `/planet/${planet.name}`,
        permanent: true
      }
    }

  const postId = query.postid
  const postVariables = { postId }
  const commentVariables = {
    postId,
    sort: query.sort ? query.sort.toUpperCase() : 'TOP'
  }

  await globalPrefetch(queryClient, ctx)

  await queryClient.prefetchQuery(['post', postVariables], key =>
    fetchPost(key, ctx)
  )

  await queryClient.prefetchQuery(['comments', commentVariables], key =>
    fetchComments(key, ctx)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      postVariables,
      commentVariables
    }
  }
}
