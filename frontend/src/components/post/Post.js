import React, { useEffect, useState } from 'react'
import { TiPinOutline } from 'react-icons/ti'
import { CgArrowRight } from 'react-icons/cg'
import { useDrag } from 'react-dnd'
import { DragItemTypes } from '@/lib/DragItemTypes'
import { getEmptyImage } from 'react-dnd-html5-backend'
import NavLink from '@/components/NavLink'
import PostEmbed from '@/components/post/PostEmbed'
import PostActions from '@/components/post/PostActions'
import PostToast from '@/components/post/PostToast'
import PostText from '@/components/post/PostText'
import UserAvatar from '@/components/user/UserAvatar'
import UserPopup from '@/components/user/UserPopup'
import PostImages from '@/components/post/PostImages'

function Post({
  post,
  index = 0,
  measure = () => {},
  showPlanet = true,
  showFullText = false,
  className = ''
}) {
  const [toast, setToast] = useState(null)
  const [timeoutId, setTimeoutId] = useState(null)

  useEffect(measure)

  const [{ isDragging }, dragRef, preview] = useDrag({
    item: { post, type: DragItemTypes.POST },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        setToast({
          post: item.post,
          folder: dropResult.folder,
          user: dropResult.user
        })
        if (timeoutId) clearTimeout(timeoutId)
        setTimeoutId(setTimeout(() => setToast(null), 1500))
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  useEffect(() => preview(getEmptyImage(), { captureDraggingState: true }))

  return (
    <article
      className={`flex outline-none relative w-full min-w-full pb-0.5`}
      data-index={index}
      ref={dragRef}
    >
      <PostToast toast={toast} />

      <div
        className={`${
          isDragging || toast ? 'opacity-40' : 'opacity-100'
        } transition w-full`}
      >
        <div
          className={`${className} flex flex-col bg-white dark:bg-gray-900 relative rounded`}
        >
          {post.sticky && (
            <TiPinOutline
              size={20}
              className="absolute top-3 right-3 text-accent"
            />
          )}
          <div className="flex items-start px-3 pt-3">
            <UserPopup user={post.author}>
              <UserAvatar user={post.author} className="w-10 h-10 mr-3" />
            </UserPopup>

            <div className="flex flex-col">
              <div className="inline-flex items-center text-sm">
                {post.author ? (
                  <>
                    <UserPopup user={post.author}>
                      <div className="text-secondary font-medium hover:underline cursor-pointer">
                        {post.author.username}
                      </div>
                    </UserPopup>
                    &nbsp;
                    <div className="text-tertiary hidden sm:block">
                      @{post.author.username}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-secondary font-semibold hover:underline cursor-pointer">
                      [deleted]
                    </div>
                    &nbsp;
                    <div className="text-tertiary hidden sm:block">
                      @[deleted]
                    </div>
                  </>
                )}

                {showPlanet && (
                  <>
                    &nbsp;
                    <CgArrowRight size={16} className="text-tertiary" />
                    &nbsp;
                    <NavLink
                      href={`/planet/${post.planet.name}`}
                      className={`font-medium hover:underline cursor-pointer`}
                      style={{ color: post.planet.color || '#3B82F6' }}
                    >
                      {post.planet.name}
                    </NavLink>
                  </>
                )}
                <span className="text-tertiary hidden sm:block">
                  &nbsp;&middot;&nbsp;{post.timeSince}
                </span>
              </div>

              {/*<span className="text-tertiary sm:hidden block text-xs">
                @{post.author.username}&nbsp;&middot;&nbsp;{post.timeSince}
              </span>*/}

              <NavLink
                href={post.relativeUrl}
                className="text-base font-medium text-primary hidden sm:block"
              >
                {post.title}
              </NavLink>
            </div>
          </div>

          <div className="mx-3 sm:mx-16">
            <NavLink
              href={post.relativeUrl}
              className="text-base font-medium text-primary sm:hidden block mb-3"
            >
              {post.title}
            </NavLink>

            <PostText
              post={post}
              measure={measure}
              showFullText={showFullText}
            />

            <PostImages post={post} measure={measure} />

            <PostEmbed post={post} measure={measure} />
          </div>

          <PostActions post={post} />
        </div>
      </div>
    </article>
  )
}

export default React.memo(Post)
