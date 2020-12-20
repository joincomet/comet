import { QueryClient } from 'react-query'
import { fetchPost, usePost } from '@/lib/queries/usePost'
import { useRouter } from 'next/router'
import Post from '@/components/post/Post'
import { fetchComments, useComments } from '@/lib/queries/useComments'
import { FiCopy } from 'react-icons/fi'
import React, { useState } from 'react'
import Comment from '@/components/Comment'
import Tippy from '@tippyjs/react'
import { useCopyToClipboard } from 'react-use'
import { dehydrate } from 'react-query/hydration'

function PostPage() {
  const router = useRouter()
  const post = usePost({ postId: router.query.id }).data
  const comments = useComments({ postId: router.query.id }).data

  return (
    <div className="relative mycontainer mt-14">
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-3 md:col-span-2 relative py-3">
          <div>
            <Post post={post} className="md:rounded-2xl" showFullText />

            <div className="px-3 md:px-0">
              {comments.map((comment, index) => (
                /*<div key={index}>{JSON.stringify(comment)}</div>*/
                <Comment comment={comment} key={comment.id} />
              ))}

              {comments.length > 0 && <div className="h-64" />}
            </div>
          </div>
        </div>

        <div className="col-span-0 md:col-span-1 hidden md:block">
          <div className="sticky top-14 pt-3">
            <ShareCard post={post} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostPage

function ShareCard({ post }) {
  const [clipboardState, copyToClipboard] = useCopyToClipboard()

  const copyLink = `https://cometx.io${post.relativeUrl}`

  const [copyTip, setCopyTip] = useState('Copy post link')

  const copy = () => {
    copyToClipboard(copyLink)
    setCopyTip('Copied post link!')
    setTimeout(() => setCopyTip('Copy post link'), 3000)
  }

  return (
    <div className="card p-3">
      <div className="font-medium text-secondary">Share Post</div>
      <Tippy content={copyTip}>
        <div
          onClick={() => copy()}
          className="mt-3 p-3 border dark:border-gray-800 rounded text-sm flex items-center text-accent cursor-pointer"
        >
          <span className="truncate pr-3">{copyLink}</span>

          <div className="ml-auto">
            <FiCopy className="w-5 h-5 text-tertiary" />
          </div>
        </div>
      </Tippy>
    </div>
  )
}

function CommentBox() {
  return (
    <div className="fixed bottom-0 left-0 right-0 ml-64 z-10">
      <div className="relative mycontainer">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <div className="transform translate-y-1/2 transition focus-within:translate-y-0 bg-white dark:bg-gray-700 rounded-t-xl p-3 shadow-2xl z-10">
              <textarea
                placeholder="Write a comment..."
                className="h-24 py-3 px-3 text-sm rounded-md w-full dark:bg-gray-700 resize-none border-none placeholder-tertiary"
              />
            </div>
          </div>
        </div>
      </div>
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
