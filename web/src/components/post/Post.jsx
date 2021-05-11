import { memo, useEffect, useMemo, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDrag, useDragDropManager } from 'react-dnd'
import { DragItemTypes } from '@/types/DragItemTypes'
import UserAvatar from '@/components/user/UserAvatar'
import ServerAvatar from '@/components/server/ServerAvatar'
import UserPopup from '@/components/user/UserPopup'
import { shortDate } from '@/utils/timeUtils'
import {
  IconChat,
  IconChevrownLeft,
  IconChevrownRight,
  IconDotsVertical,
  IconLinkWeb,
  IconText,
  IconUserToServerArrow,
  IconVote
} from '@/components/ui/icons/Icons'
import { useTogglePostVote } from '@/components/post/useTogglePostVote'
import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'
import PostEmbed from '@/components/post/PostEmbed'

export default memo(function Post({
  post,
  isPostPage = false,
  showServerName = false,
  className = '',
  index
}) {
  const { push } = useHistory()

  const toggleVote = useTogglePostVote(post)

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
    console.log({ dragging, isDragging })
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
      return 'Text'
    else if (post.linkUrl) return post.domain
    else if (post.images?.length === 1) return 'Image'
    else if (post.images?.length > 1) return 'Image Album'
  }, [post.domain, post.images, post.linkUrl, post.text])

  const onClick = e => {
    e.stopPropagation()
    e.preventDefault()
  }

  const [currentImage, setCurrentImage] = useState(0)

  return (
    <ContextMenuTrigger data={{ type: ContextMenuType.Post, post }}>
      <div
        ref={dragRef}
        style={{ opacity }}
        className={`${className} cursor-pointer relative group hover:shadow dark:bg-gray-800 dark:hover:bg-gray-825 pt-3 px-3 pb-3 rounded flex`}
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

        {!isPostPage && (
          <div
            className="w-26 h-18 rounded dark:bg-gray-700 mr-3 flex items-center justify-center bg-center bg-cover bg-no-repeat"
            style={
              post.thumbnailUrl
                ? { backgroundImage: `url(${post.thumbnailUrl})` }
                : {}
            }
          >
            {!!post.text && <IconText className="w-8 h-8 text-tertiary" />}
            {!post.thumbnailUrl && !post.text && (
              <IconLinkWeb className="w-8 h-8 text-tertiary" />
            )}
          </div>
        )}

        <div className="pr-3 py-0.5 flex-grow flex flex-col">
          <Link to={post.relativeUrl} className="text-secondary font-medium">
            {post.title}
            <span className="text-xs text-mid">&nbsp;&nbsp;{type}</span>
          </Link>

          {isPostPage && type && (
            <div className="border-b dark:border-gray-750 mt-0.5 pb-2">
              {!!post.text && (
                <div
                  dangerouslySetInnerHTML={{ __html: post.text }}
                  className="prose prose-sm dark:prose-dark max-w-none pt-0.5"
                />
              )}

              {!!post.linkUrl && (
                <>
                  {post.linkMetadata ? (
                    <div className="max-w-screen-md w-full mt-2">
                      <PostEmbed
                        linkUrl={post.linkUrl}
                        metadata={post.linkMetadata}
                      />
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

              {post.images?.length >= 1 && (
                <div className="max-w-screen-md w-full mt-2">
                  <div className="flex relative">
                    <div className="aspect-h-9 aspect-w-16 relative flex w-full dark:bg-gray-775">
                      {post.images.map((image, i) => (
                        <img
                          key={i}
                          alt=""
                          src={image.url}
                          className={`w-full h-full object-contain select-none ${
                            i === currentImage ? 'block' : 'hidden'
                          }`}
                        />
                      ))}
                    </div>
                    {post.images.length > 1 && (
                      <>
                        {currentImage > 0 && (
                          <div
                            onClick={() => setCurrentImage(currentImage - 1)}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 rounded-full shadow flex items-center justify-center w-10 h-10 dark:bg-white"
                          >
                            <IconChevrownLeft className="w-5 h-5 dark:text-black" />
                          </div>
                        )}

                        {currentImage < post.images.length - 1 && (
                          <div
                            onClick={() => setCurrentImage(currentImage + 1)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full shadow flex items-center justify-center w-10 h-10 dark:bg-white"
                          >
                            <IconChevrownRight className="w-5 h-5 dark:text-black" />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="h-12 dark:bg-gray-750 flex items-center px-5 text-13 select-none">
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
                </div>
              )}
            </div>
          )}

          <div className="flex items-center pt-2 mt-auto">
            <div className="flex items-center" onClick={onClick}>
              <ContextMenuTrigger
                data={{ type: ContextMenuType.User, user: post.author?.user }}
              >
                <UserPopup
                  user={post.author?.user}
                  roles={post.author?.roles}
                  nickname={post.author?.nickname}
                >
                  <UserAvatar user={post.author.user} size={5} />
                </UserPopup>
              </ContextMenuTrigger>

              <ContextMenuTrigger
                data={{ type: ContextMenuType.User, user: post.author?.user }}
              >
                <UserPopup
                  user={post.author?.user}
                  roles={post.author?.roles}
                  nickname={post.author?.nickname}
                >
                  <div
                    className="ml-2 hover:underline cursor-pointer text-tertiary text-xs font-medium leading-none"
                    style={{ color: post.author?.color }}
                  >
                    {post.author.name}
                  </div>
                </UserPopup>
              </ContextMenuTrigger>

              {showServerName && (
                <div className="ml-1 flex items-center" onClick={onClick}>
                  <IconUserToServerArrow className="w-4.5 h-4.5 text-mid mr-1" />
                  <Link
                    to={`/server/${post.server.id}`}
                    className="flex items-center"
                  >
                    <ServerAvatar
                      server={post.server}
                      size={5}
                      className="dark:bg-gray-750 rounded-full"
                    />
                    <span className="ml-2 text-xs font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                      {post.server.name}
                    </span>
                  </Link>
                  <div className="text-xs text-mid font-medium">
                    &nbsp;&nbsp;&middot;&nbsp;&nbsp;{shortDate(post.createdAt)}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center ml-auto" onClick={onClick}>
              <div
                className={`text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer`}
              >
                <IconChat className="w-5 h-5" />
                <div className="ml-2 text-xs font-medium">
                  {post.commentCount}
                </div>
              </div>

              <div
                onClick={e => {
                  e.preventDefault()
                  toggleVote()
                }}
                className={`${
                  post.isVoted
                    ? 'text-red-400'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                } flex items-center cursor-pointer ml-6`}
              >
                <IconVote className="w-4 h-4" />
                <div className="ml-2 text-xs font-medium">{post.voteCount}</div>
                {/*<IconChevrownUp className="w-5 h-5" />
              <div className="mx-2 text-xs text-blue-400 font-medium">
                {post.voteCount}
              </div>
              <IconChevronDown className="w-5 h-5 text-blue-400" />*/}
              </div>

              <ContextMenuTrigger
                data={{ type: ContextMenuType.Post, post }}
                leftClick
              >
                <div
                  className={`ml-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer`}
                >
                  <IconDotsVertical className="text-disabled w-4 h-4" />
                </div>
              </ContextMenuTrigger>
            </div>
          </div>
        </div>
      </div>
    </ContextMenuTrigger>
  )
})
