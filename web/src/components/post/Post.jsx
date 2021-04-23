import { memo, useMemo, useState } from 'react'
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
  IconChevrownLeft,
  IconChevrownRight,
  IconDotsHorizontal,
  IconLinkWeb,
  IconText,
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

  const type = useMemo(() => {
    if (post.text) return 'Text'
    else if (post.linkUrl) return post.domain
    else if (post.images?.length === 1) return 'Image'
    else if (post.images?.length > 1) return 'Image Album'
  }, [post.domain, post.images?.length, post.linkUrl, post.text])

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
        className={`${className} cursor-pointer relative transition dark:bg-gray-800 pt-3 px-3 pb-3 rounded flex`}
      >
        {!isPostPage && (
          <div
            className="w-26 flex-shrink-0 rounded dark:bg-gray-700 mr-3 flex items-center justify-center bg-center bg-cover bg-no-repeat"
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
            <UserPopup
              user={post.author?.user}
              nickname={post.author?.nickname}
              roles={post.author?.roles}
            >
              <UserAvatar user={post.author?.user} size={7} />
            </UserPopup>
          </ContextMenuTrigger>
        </div>

        <div className="pl-3 flex-grow">
          <div className="flex items-end pb-1">
            <div onClick={onClick}>
              <ContextMenuTrigger
                data={{ type: ContextMenuType.User, user: post.author }}
              >
                <UserPopup user={post.author}>
                  <div
                    className="hover:underline cursor-pointer text-sm font-medium leading-none"
                    style={{ color: post.author?.color }}
                  >
                    {post.author.name}
                  </div>
                </UserPopup>
              </ContextMenuTrigger>
            </div>

            <div className="text-11 text-mid font-medium pl-2 leading-none">
              {calendarDate(post.createdAt)} &middot; {type}
            </div>
          </div>

          <Link to={post.relativeUrl} className="text-primary text-base">
            {post.title}
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
      </div>
    </ContextMenuTrigger>
  )
})
