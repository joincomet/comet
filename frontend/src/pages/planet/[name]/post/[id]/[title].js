import { QueryClient } from 'react-query'
import { dehydrate } from '@/lib/dehydrate'
import { fetchPost, usePost } from '@/lib/usePost'
import { useRouter } from 'next/router'
import Post from '@/components/post/Post'
import { fetchComments, useComments } from '@/lib/useComments'
import NavLink from '@/components/NavLink'
import Image from 'next/image'
import { FiUser } from 'react-icons/fi'
import { BiRocket } from 'react-icons/bi'
import React from 'react'
import PermanentHeader from '@/components/PermanentHeader'
import Comment from '@/components/Comment'

const chip =
  'cursor-pointer px-3 h-8 inline-flex flex-row items-center rounded-full dark:border-gray-700 border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition'

export default function PlanetPage() {
  const router = useRouter()
  const post = usePost({ postId: router.query.id }).data
  const comments = useComments({ postId: router.query.id }).data

  const hasChild = comment =>
    comments.filter(c => c.parentCommentId === comment.id).length > 0

  return (
    <div className="relative">
      <PermanentHeader />

      <div
        className="fixed bottom-0 right-0 left-0 h-24 py-3 px-72 bg-white dark:bg-gray-800 shadow-2xl z-10"
        style={{ marginLeft: '17.5rem', marginRight: '17.5rem' }}
      >
        <div className="flex">
          <div
            className={`w-10 h-10 relative mr-3 flex-shrink-0 rounded-full hover:shadow-lg bg-gray-200 dark:bg-gray-700`}
          >
            <FiUser size={20} className="m-2.5 text-gray-500" />
          </div>
          <textarea
            placeholder="Write a comment..."
            className="h-auto py-3 px-3 text-sm rounded-md w-full dark:bg-gray-800 resize-none border-none transition hover:border-blue-500"
          />
        </div>
      </div>

      <div className="pt-6">
        <Post post={post} className="rounded-2xl" />
      </div>

      <div className={`mx-3 2xl:mx-72 mb-3`}>
        {comments.map((comment, index) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>

      <div className="h-64" />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['post', { postId: ctx.query.id }], key =>
    fetchPost(key, ctx)
  )

  await queryClient.prefetchQuery(['comments', { postId: ctx.query.id }], key =>
    fetchComments(key, ctx)
  )

  const dehydratedState = dehydrate(queryClient)

  return {
    props: {
      dehydratedState
    }
  }
}
