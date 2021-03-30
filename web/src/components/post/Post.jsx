import { memo, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import { useDrag } from 'react-dnd'
import { DragItemTypes } from '@/lib/DragItemTypes'
import ReactPlayer from 'react-player'
import UserAvatar from '@/components/avatars/UserAvatar'
import ServerAvatar from '@/components/avatars/ServerAvatar'
import ServerPopup from '@/components/popups/ServerPopup'
import UserPopup from '@/components/popups/UserPopup'
import { useMutation } from 'urql'
import { CREATE_POST_VOTE, REMOVE_POST_VOTE } from '@/graphql/mutations'
import { calendarDate } from '@/lib/timeUtils'
import {
  IconChat,
  IconDotsHorizontal,
  IconLinkWeb,
  IconText,
  IconVote
} from '@/lib/Icons'
import { useContextMenuTrigger } from 'react-context-menu-wrapper'
import { mergeRefs } from '@/lib/mergeRefs'
import { useTranslation } from 'react-i18next'
import { ContextMenuType } from '@/components/context-menus/ContextMenuType'

export default memo(function Post({
  post,
  isPostPage = false,
  showServerName = false,
  className = '',
  measure
}) {
  const [_createVoteRes, createVote] = useMutation(CREATE_POST_VOTE)
  const [_removeVoteRes, removeVote] = useMutation(REMOVE_POST_VOTE)

  const variables = { postId: post.id }
  const toggleVote = () => {
    if (!post.isVoted) createVote(variables)
    else removeVote(variables)
  }

  const [{ opacity }, dragRef] = useDrag({
    type: DragItemTypes.Post,
    item: post,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  })

  const contextMenuRef = useContextMenuTrigger({
    menuId: ContextMenuType.Post,
    data: { post }
  })

  const { push } = useHistory()

  const { t } = useTranslation()

  let type = ''
  if (post.text) type = 'Text'
  else if (post.linkUrl) type = post.domain
  else if (post.imageUrls.length === 1) type = 'Image'
  else if (post.imageUrls.length > 1) type = 'Image Album'

  return (
    <article
      ref={mergeRefs(contextMenuRef, dragRef)}
      onClick={() => push(post.relativeUrl)}
      style={{ opacity }}
      className={`${className} cursor-pointer relative transition dark:bg-gray-800 pt-3 px-3 pb-3 rounded flex`}
    >
      {!isPostPage && (
        <div
          className="w-24 h-16 flex-shrink-0 rounded dark:bg-gray-700 mr-3 flex items-center justify-center"
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

      <UserPopup user={post.author}>
        <UserAvatar user={post.author} size={7} />
      </UserPopup>

      <div className="pl-3 flex-grow">
        <div className="flex items-end pb-2">
          <UserPopup user={post.author}>
            <div className="hover:underline cursor-pointer text-sm font-medium text-accent leading-none">
              {post.author.name}
            </div>
          </UserPopup>
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
              <img src={post.imageUrls[0]} className="max-w-screen-lg" />
            )}
          </div>
        )}

        <div className="flex items-center pt-2">
          <div
            onClick={e => {
              e.stopPropagation()
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
            <div className="ml-2 text-xs font-medium">{post.commentCount}</div>
          </div>

          <div
            className={`ml-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex items-center cursor-pointer`}
          >
            <IconDotsHorizontal className="w-5 h-5" />
          </div>

          {showServerName && (
            <div className="ml-4 flex items-center">
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
    </article>
  )
})
