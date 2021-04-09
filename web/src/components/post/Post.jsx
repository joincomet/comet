import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDrag } from 'react-dnd'
import { DragItemTypes } from '@/types/DragItemTypes'
import UserAvatar from '@/components/user/UserAvatar'
import ServerAvatar from '@/components/server/ServerAvatar'
import ServerPopup from '@/components/server/ServerPopup'
import UserPopup from '@/components/user/UserPopup'
import { calendarDate } from '@/utils/timeUtils'
import {
  IconChat,
  IconDotsHorizontal,
  IconLinkWeb,
  IconText,
  IconVote
} from '@/components/ui/icons/Icons'
import { useTogglePostVote } from '@/components/post/useTogglePostVote'
import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import useContextMenu from '@/hooks/use-context-menu'
import { ContextMenuType } from '@/types/ContextMenuType'

export default memo(function Post({
  post,
  isPostPage = false,
  showServerName = false,
  className = ''
}) {
  const toggleVote = useTogglePostVote(post)

  const [{ opacity }, dragRef] = useDrag({
    type: DragItemTypes.Post,
    item: post,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  })

  let type = ''
  if (post.text) type = 'Text'
  else if (post.linkUrl) type = post.domain
  else if (post.imageUrls.length === 1) type = 'Image'
  else if (post.imageUrls.length > 1) type = 'Image Album'

  const onClick = e => {
    e.stopPropagation()
    e.preventDefault()
  }

  const contextMenu = useContextMenu()
  const nameContextMenu = useContextMenu()
  const avatarContextMenu = useContextMenu()

  return (
    <ContextMenuTrigger data={{ type: ContextMenuType.Post, post }}>
      <Link
        to={post.relativeUrl}
        ref={dragRef}
        style={{ opacity }}
        className={`${className} cursor-pointer relative transition dark:bg-gray-800 pt-3 px-3 pb-3 rounded flex`}
      >
        {!isPostPage && (
          <div
            className="w-28 h-18 flex-shrink-0 rounded dark:bg-gray-700 mr-3 flex items-center justify-center bg-center bg-cover bg-no-repeat"
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

        <div onClick={onClick}>
          <ContextMenuTrigger
            data={{ type: ContextMenuType.User, user: post.author }}
          >
            <UserPopup user={post.author}>
              <UserAvatar user={post.author} size={7} />
            </UserPopup>
          </ContextMenuTrigger>
        </div>

        <div className="pl-3 flex-grow">
          <div className="flex items-end pb-2">
            <div onClick={onClick}>
              <ContextMenuTrigger
                data={{ type: ContextMenuType.User, user: post.author }}
              >
                <UserPopup user={post.author}>
                  <div className="hover:underline cursor-pointer text-sm font-medium text-accent leading-none">
                    {post.author.name}
                  </div>
                </UserPopup>
              </ContextMenuTrigger>
            </div>

            <div className="text-11 text-mid font-medium pl-2 leading-none">
              {calendarDate(post.createdAt)} &middot; {type}
            </div>
          </div>

          <div className="text-primary text-base">{post.title}</div>

          {isPostPage && type && (
            <div className="border-t dark:border-gray-750 mt-2 pt-2">
              {!!post.text && (
                <div
                  dangerouslySetInnerHTML={{ __html: post.text }}
                  className="prose prose-sm dark:prose-dark max-w-none"
                />
              )}
              {post.imageUrls.length >= 1 && (
                <img
                  alt=""
                  src={post.imageUrls[0]}
                  className="max-w-screen-lg"
                />
              )}
            </div>
          )}

          <div className="flex items-center pt-2">
            <div
              onClick={e => {
                e.preventDefault()
                toggleVote()
              }}
              className={`${
                post.isVoted
                  ? 'text-red-400'
                  : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              } flex items-center cursor-pointer`}
            >
              <IconVote className="w-4 h-4" />
              <div className="ml-2 text-xs font-medium">{post.voteCount}</div>
            </div>

            <div
              className={`ml-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer`}
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
                className={`ml-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer`}
              >
                <IconDotsHorizontal className="w-5 h-5" />
              </div>
            </ContextMenuTrigger>

            {showServerName && (
              <div className="ml-4 flex items-center" onClick={onClick}>
                <ServerPopup server={post.server}>
                  <ServerAvatar server={post.server} size={5} />
                </ServerPopup>
                <ServerPopup server={post.server}>
                  <span className="ml-2 text-xs font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    {post.server.name}
                  </span>
                </ServerPopup>
              </div>
            )}
          </div>
        </div>
      </Link>
    </ContextMenuTrigger>
  )
})
