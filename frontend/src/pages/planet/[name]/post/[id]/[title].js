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

const chip =
  'cursor-pointer px-3 h-8 inline-flex flex-row items-center rounded-full dark:border-gray-700 border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition'

export default function PlanetPage() {
  const router = useRouter()
  const post = usePost({ postId: router.query.id }).data
  const comments = useComments({ postId: router.query.id }).data

  const hasChild = comment =>
    comments.filter(c => c.parentCommentId === comment.id).length > 0

  return (
    <div>
      <PermanentHeader />

      <div className="pt-6">
        <Post post={post} />
      </div>

      {comments.map((comment, index) => (
        <div key={index} className={`mx-3 2xl:mx-72 mb-3`}>
          <div
            className="flex relative"
            style={{ marginLeft: comment.level * 2 + 'rem' }}
          >
            {hasChild(comment) && <div className="commentcollapse" />}
            <NavLink
              href={`/user/${comment.author.username}`}
              className={`w-10 h-10 relative mr-3 flex-shrink-0 rounded-full hover:shadow-lg ${
                comment.author.avatarUrl ? '' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {comment.author.avatarUrl ? (
                <Image
                  src={comment.author.avatarUrl}
                  layout="fill"
                  className="rounded-full object-cover object-center"
                  loading="eager"
                />
              ) : (
                <FiUser size={20} className="m-2.5 text-gray-500" />
              )}
            </NavLink>
            <div className="dark:bg-gray-800 arrow_box rounded-md w-full">
              <div className="flex items-start w-full">
                <div className="flex flex-col w-full">
                  <div className="flex items-center text-sm dark:bg-gray-800 border-b dark:border-gray-700 py-3 mx-3 rounded-t-md">
                    <span className="text-secondary font-semibold hover:underline cursor-pointer">
                      {comment.author.username}
                    </span>
                    &nbsp;
                    <span className="text-tertiary">
                      @{comment.author.username}
                    </span>
                    <span className="text-tertiary">
                      &nbsp;&middot;&nbsp;{comment.timeSince}
                    </span>
                  </div>

                  <div
                    className="text-sm p-3"
                    dangerouslySetInnerHTML={{ __html: comment.textContent }}
                  />

                  {/*<div className="px-1.5 py-1.5">
                  <div className={`${chip} mr-3 text-tertiary`}>
                    <BiRocket className={`w-4.5 h-4.5`} />
                    <span className="ml-3 text-sm font-medium">
                      {post.rocketCount}
                    </span>
                  </div>
                </div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
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
