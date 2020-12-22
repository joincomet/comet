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
import CreateCommentButton from '@/components/createcomment/CreateCommentButton'
import PlanetHeader from '@/components/planet/PlanetHeader'
import UserHeader from '@/components/user/UserHeader'
import InfoLinks from '@/components/InfoLinks'
import NavLink from '@/components/NavLink'
import { NextSeo } from 'next-seo'
import PlanetAbout from '@/components/planet/PlanetAbout'
import UserAbout from '@/components/user/UserAbout'

function PostPage({ postVariables, commentVariables }) {
  const { query, pathname } = useRouter()
  const post = usePost(postVariables).data
  const { comments, commentCount } = useComments(commentVariables).data
  const [parentComment, setParentComment] = useState(null)

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

      <div className="relative mycontainer mt-14 md:mt-28">
        {post.planet ? (
          <PlanetHeader show={true} planet={post.planet} />
        ) : (
          <UserHeader show={true} user={post.author} />
        )}

        <CreateCommentButton
          post={post}
          parentComment={parentComment}
          setParentComment={setParentComment}
        />
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 md:col-span-2 relative py-3">
            <div>
              <Post post={post} className="md:rounded" showFullText />

              <div className="px-3 md:px-0">
                <div
                  className={`header-3 text-secondary pt-5 pb-2 flex items-center space-x-4 ${
                    commentCount === 0 ? 'justify-center' : ''
                  }`}
                >
                  <div>
                    {`${commentCount > 0 ? commentCount : 'No'} Comment${
                      commentCount === 1 ? '' : 's'
                    }`}
                  </div>

                  {commentCount > 0 && (
                    <>
                      <NavLink
                        href={{
                          pathname,
                          query: (() => {
                            const q = { ...query }
                            delete q.sort
                            return q
                          })()
                        }}
                        className={`cursor-pointer hover:underline ${
                          !query.sort || query.sort === 'top'
                            ? 'text-accent'
                            : 'text-tertiary'
                        }`}
                      >
                        Top
                      </NavLink>
                      <NavLink
                        href={{ pathname, query: { ...query, sort: 'new' } }}
                        className={`cursor-pointer hover:underline ${
                          query.sort === 'new' ? 'text-accent' : 'text-tertiary'
                        }`}
                      >
                        New
                      </NavLink>
                    </>
                  )}
                </div>

                {comments.map((comment, index) => (
                  /*<div key={index}>{JSON.stringify(comment)}</div>*/
                  <Comment
                    comment={comment}
                    key={comment.id}
                    setParentComment={setParentComment}
                  />
                ))}

                {comments.length > 0 && <div className="h-64" />}
              </div>
            </div>
          </div>

          <div className="col-span-0 md:col-span-1 hidden md:block">
            <div className="sticky top-28 pt-6">
              <div className="mb-4">
                {post.planet ? (
                  <PlanetAbout planet={post.planet} />
                ) : (
                  <UserAbout user={post.author} />
                )}
              </div>

              <ShareCard post={post} />
              <div className="mt-3">
                <InfoLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostPage

function ShareCard({ post }) {
  const [clipboardState, copyToClipboard] = useCopyToClipboard()

  const copyLink = `https://cometx.io${post.relativeUrl}`

  const [copyTip, setCopyTip] = useState('Copy post link')

  const copy = () => {
    copyToClipboard(copyLink)
    setCopyTip('Copied!')
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

export async function getServerSideProps(ctx) {
  const queryClient = new QueryClient()

  const { query } = ctx

  const postVariables = { postId: query.id }
  const commentVariables = {
    postId: query.id,
    sort: query.sort ? query.sort.toUpperCase() : 'TOP'
  }

  await queryClient.prefetchQuery(['post', postVariables], key =>
    fetchPost(key, ctx)
  )

  await queryClient.prefetchQuery(['comments', commentVariables], key =>
    fetchComments(key, ctx)
  )

  const dehydratedState = dehydrate(queryClient)

  return {
    props: {
      dehydratedState,
      postVariables,
      commentVariables
    }
  }
}
