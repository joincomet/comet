import { memo, useEffect, useMemo, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDrag, useDragDropManager } from 'react-dnd'
import { DragItemTypes } from '@/types/DragItemTypes'
import ServerAvatar from '@/components/server/ServerAvatar'
import UserPopup from '@/components/user/UserPopup'
import {
  IconChat,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconDotsVertical,
  IconLinkWeb,
  IconText
} from '@/components/ui/icons/Icons'
import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'
import PostEmbed from '@/components/post/PostEmbed'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'
import { useOpenLogin } from '@/hooks/useLoginDialog'
import { formatDistanceToNowStrict } from 'date-fns'
import { useUpdatePostVoteMutation, VoteType } from '@/graphql/hooks'
import MessageImageDialog from '@/components/message/MessageImageDialog'

export default memo(function Post({
  post,
  isPostPage = false,
  showServerName = false,
  className = '',
  index
}) {
  const { push } = useHistory()
  const [updatePostVote] = useUpdatePostVoteMutation()

  const [{ opacity }, dragRef] = useDrag({
    type: DragItemTypes.Post,
    item: post,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  })

  const dragDropManager = useDragDropManager()
  const dragging = dragDropManager.getMonitor().isDragging()
  const [isDragging, setIsDragging] = useState(false)
  useEffect(() => {
    if (dragging) {
      setIsDragging(true)
    } else {
      const id = setTimeout(() => setIsDragging(false), 300)
      return () => clearTimeout(id)
    }
  }, [dragging])

  const type = useMemo(() => {
    if (
      post.text ||
      (!post.text &&
        !post.linkUrl &&
        (!post.images || post.images.length === 0))
    )
      return 'text post'
    else if (post.linkUrl) return post.domain
    else if (post.images?.length === 1) return 'image post'
    else if (post.images?.length > 1) return 'image album'
  }, [post.domain, post.images, post.linkUrl, post.text])

  const onClick = e => {
    e.stopPropagation()
    e.preventDefault()
  }

  const [currentImage, setCurrentImage] = useState(0)
  const [currentUser] = useCurrentUser()
  const openLogin = useOpenLogin()

  return (
    <ContextMenuTrigger data={{ type: ContextMenuType.Post, post }}>
      <div
        style={{ opacity }}
        className={`${className} cursor-pointer relative group hover:shadow dark:bg-gray-800 dark:hover:bg-gray-825 bg-gray-200 px-2 py-3 md:rounded flex hover:bg-gray-300`}
        onClick={() => {
          if (!isDragging) {
            push(post.relativeUrl)
          }
        }}
      >
        {/*<div className="absolute top-3 right-3 flex items-center">
          {post.linkMetadata?.logo && (
            <div
              className="h-6 w-6 rounded-full transform transition opacity-50 group-hover:opacity-100 group-hover:scale-105 group-hover:shadow-md dark:bg-gray-725 bg-contain bg-center"
              style={
                post.linkMetadata?.logo
                  ? { backgroundImage: `url(${post.linkMetadata?.logo})` }
                  : {}
              }
            />
          )}

          {!!(index + 1) && (
            <div className="ml-2 w-6 h-6 leading-none flex items-center justify-center text-xs font-medium text-mid transform transition opacity-50 group-hover:opacity-100 group-hover:scale-105">
              #{index + 1}
            </div>
          )}
        </div>*/}

        <div className="flex flex-col items-center pr-2">
          <button
            type="button"
            className={`focus:outline-none p-1 rounded-full dark:hover:bg-gray-750 transition cursor-pointer hover:bg-gray-200 ${
              post.voteType === VoteType.Up ? 'text-red-400' : 'text-mid'
            }`}
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
              if (!currentUser) {
                openLogin()
                return
              }
              let voteCount = post.voteCount
              if (post.voteType === VoteType.Up) {
                voteCount--
              } else if (post.voteType === VoteType.None) {
                voteCount++
              } else if (post.voteType === VoteType.Down) {
                voteCount += 2
              }
              updatePostVote({
                variables: {
                  input: {
                    postId: post.id,
                    type:
                      post.voteType === VoteType.Up
                        ? VoteType.None
                        : VoteType.Up
                  }
                },
                optimisticResponse: {
                  ...post,
                  voteType:
                    post.voteType === VoteType.Up ? VoteType.None : VoteType.Up,
                  voteCount
                }
              })
            }}
          >
            <IconChevronUp className="w-5 h-5" />
          </button>
          <div
            className={`text-13 leading-none font-semibold ${
              post.voteType === VoteType.Up ? 'text-red-400' : ''
            } ${post.voteType === VoteType.Down ? 'text-blue-400' : ''} ${
              post.voteType === VoteType.None ? 'text-tertiary' : ''
            }`}
          >
            {post.voteCount < 0 ? 0 : post.voteCount}
          </div>
          {post.server.isDownvotesEnabled && (
            <button
              type="button"
              className={`focus:outline-none p-1 rounded-full dark:hover:bg-gray-750 transition cursor-pointer ${
                post.voteType === VoteType.Down ? 'text-blue-400' : 'text-mid'
              }`}
              onClick={e => {
                e.stopPropagation()
                e.preventDefault()
                if (!currentUser) {
                  openLogin()
                  return
                }
                let voteCount = post.voteCount
                if (post.voteType === VoteType.Down) {
                  voteCount++
                } else if (post.voteType === VoteType.None) {
                  voteCount--
                } else if (post.voteType === VoteType.Up) {
                  voteCount -= 2
                }
                updatePostVote({
                  variables: {
                    input: {
                      postId: post.id,
                      type:
                        post.voteType === VoteType.Down
                          ? VoteType.None
                          : VoteType.Down
                    }
                  },
                  optimisticResponse: {
                    ...post,
                    voteType:
                      post.voteType === VoteType.Down
                        ? VoteType.None
                        : VoteType.Down,
                    voteCount
                  }
                })
              }}
            >
              <IconChevronDown className="w-5 h-5" />
            </button>
          )}
        </div>

        {!isPostPage && (
          <div
            className="w-26 min-w-[6.5rem] h-18 min-h-[4.5rem] rounded dark:bg-gray-750 bg-gray-300 mr-4 flex items-center justify-center bg-center bg-cover bg-no-repeat"
            style={
              post.thumbnailUrl
                ? { backgroundImage: `url(${post.thumbnailUrl})` }
                : {}
            }
          >
            {!post.thumbnailUrl && (
              <>
                {post.linkUrl ? (
                  <IconLinkWeb className="w-8 h-8 text-mid" />
                ) : (
                  <IconText className="w-8 h-8 text-mid" />
                )}
              </>
            )}
          </div>
        )}

        <div className="pr-4 flex-grow flex flex-col">
          <div className="flex flex-wrap items-center pb-1.5" onClick={onClick}>
            <Link to={`/+${post.server.name}`} className="flex items-center">
              <ServerAvatar
                server={post.server}
                size={5}
                className="dark:bg-gray-750 rounded-full"
              />
              <span className="ml-1.5 text-xs font-medium text-secondary">
                {post.server.displayName}
              </span>
            </Link>
            <span className="text-xs text-tertiary">
              &nbsp;&middot;&nbsp;
              {formatDistanceToNowStrict(new Date(post.createdAt))}
              &nbsp;ago&nbsp;by
            </span>
            <ContextMenuTrigger
              data={{ type: ContextMenuType.User, user: post.author }}
            >
              <UserPopup user={post.author} role={post.serverUser?.role}>
                <div
                  className="ml-1 cursor-pointer text-tertiary text-xs font-medium leading-none"
                  style={{ color: post.serverUser?.role?.color }}
                >
                  {post.author?.username ?? '[deleted]'}
                </div>
              </UserPopup>
            </ContextMenuTrigger>
            <div className="text-xs text-mid font-medium">
              &nbsp;&middot;&nbsp;
              <span className="text-xs text-mid">({type})</span>
            </div>
          </div>

          <div className="text-secondary font-medium text-base">
            {post.title}
          </div>

          {isPostPage &&
            type &&
            (!!post.text || !!post.linkUrl || !!post.images.length) && (
              <div className="mt-0.5 pb-2">
                {!!post.text && (
                  <div
                    dangerouslySetInnerHTML={{ __html: post.text }}
                    className="prose prose-sm dark:prose-dark max-w-none pt-0.5"
                  />
                )}

                {!!post.linkUrl && (
                  <>
                    {post.linkMetadata ? (
                      <div className="max-w-screen-sm w-full mt-2">
                        <PostEmbed dark metadata={post.linkMetadata} />
                      </div>
                    ) : (
                      <a
                        href={post.linkUrl}
                        target="_blank"
                        rel="noopener nofollow noreferrer"
                        className="text-sm text-blue-400 hover:underline cursor-pointer pt-0.5"
                      >
                        {post.linkUrl}
                      </a>
                    )}
                  </>
                )}

                {!!post.images.length && (
                  <div className="mt-2 max-w-[400px]">
                    <div className="flex relative">
                      <div className="w-full h-[300px] relative flex items-center justify-center dark:bg-gray-775">
                        {post.images.map((image, i) => (
                          <div
                            key={i}
                            className={`select-none ${
                              i === currentImage ? 'block' : 'hidden'
                            }`}
                          >
                            <MessageImageDialog
                              rounded={false}
                              image={image.image}
                              key={i}
                            />
                          </div>

                          /*<img
                              key={i}
                              alt=""
                              src={image.url}
                              className={`w-full h-full object-contain select-none ${
                                i === currentImage ? 'block' : 'hidden'
                              }`}
                            />*/
                        ))}
                      </div>
                      {post.images.length > 1 && (
                        <>
                          {currentImage > 0 && (
                            <div
                              onClick={() => setCurrentImage(currentImage - 1)}
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 rounded-full shadow flex items-center justify-center w-10 h-10 dark:bg-white"
                            >
                              <IconChevronLeft className="w-5 h-5 dark:text-black" />
                            </div>
                          )}

                          {currentImage < post.images.length - 1 && (
                            <div
                              onClick={() => setCurrentImage(currentImage + 1)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full shadow flex items-center justify-center w-10 h-10 dark:bg-white"
                            >
                              <IconChevronRight className="w-5 h-5 dark:text-black" />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    {!!post.images.find(
                      image => image.caption || image.linkUrl
                    ) && (
                      <div className="h-12 dark:bg-gray-750 flex items-center px-5 text-sm select-none">
                        {post.images[currentImage].caption && (
                          <div
                            className="text-primary truncate pr-3"
                            title={post.images[currentImage].caption}
                          >
                            {post.images[currentImage].caption}
                          </div>
                        )}

                        {post.images[currentImage].linkUrl && (
                          <a
                            href={post.images[currentImage].linkUrl}
                            target="_blank"
                            rel="noopener nofollow noreferrer"
                            className="ml-auto text-blue-400 hover:underline cursor-pointer"
                          >
                            {post.images[currentImage].linkUrl}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

          <div className="flex items-center pt-1.5">
            <div
              className={`select-none text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer`}
            >
              <IconChat className="w-5 h-5" />
              <div className="ml-2 text-xs font-medium">
                {post.commentCount}
              </div>
            </div>

            <ContextMenuTrigger
              data={{ type: ContextMenuType.Post, post }}
              leftClick
            >
              <div
                className={`ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer`}
              >
                <IconDotsVertical className="text-disabled w-4 h-4" />
              </div>
            </ContextMenuTrigger>
          </div>
        </div>
      </div>
    </ContextMenuTrigger>
  )
})
