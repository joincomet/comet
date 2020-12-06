import React, { useEffect, useState } from 'react'
import {
  FiFolder,
  FiStar,
  FiUser,
  FiLink,
  FiMessageCircle,
  FiMoreHorizontal,
  FiShare,
  FiFolderPlus,
  FiRepeat
} from 'react-icons/fi'
import { TiPinOutline } from 'react-icons/ti'
import { HiSwitchHorizontal } from 'react-icons/hi'
import { CgArrowRight } from 'react-icons/cg'
import { BiRocket } from 'react-icons/bi'
import { AnimatePresence, motion } from 'framer-motion'
import { useDrag } from 'react-dnd'
import { DragItemTypes } from '@/lib/DragItemTypes'
import { getEmptyImage } from 'react-dnd-html5-backend'
import Image from 'next/image'
import NavLink from '@/components/NavLink'
import PostEmbed from '@/components/post/PostEmbed'
import PostActions from '@/components/post/PostActions'
import PostToast from '@/components/post/PostToast'
import PostText from '@/components/post/PostText'

const colors = [
  'text-red-500',
  'text-amber-500',
  'text-green-500',
  'text-blue-500',
  'text-purple-500',
  'text-pink-500'
]

function Post({ post, index = 0, measure = () => {}, showPlanet = true }) {
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
      className={`flex outline-none relative w-full min-w-full`}
      data-index={index}
      ref={dragRef}
    >
      <PostToast toast={toast} />

      <div
        className={`${
          isDragging || toast ? 'opacity-40' : 'opacity-100'
        }  transition pb-3 w-full`}
      >
        <div className="sm:mx-3 2xl:mx-72 flex flex-col bg-white dark:bg-gray-800 sm:rounded-md shadow-md relative">
          {post.sticky && (
            <TiPinOutline
              size={20}
              className="absolute top-3 right-3 text-accent"
            />
          )}
          <div className="flex items-start m-3">
            <NavLink
              href={`/user/${post.author.username}`}
              className={`w-10 h-10 relative mr-3 flex-shrink-0 rounded-full hover:shadow-lg ${
                post.author.avatarURL ? '' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {post.author.avatarURL ? (
                <Image
                  src={post.author.avatarURL}
                  layout="fill"
                  className="rounded-full object-cover object-center"
                  loading="eager"
                />
              ) : (
                <FiUser size={20} className="m-2.5 text-gray-500" />
              )}
            </NavLink>
            <div className="flex flex-col">
              <div className="inline-flex items-center text-sm">
                <span className="text-secondary font-semibold hover:underline cursor-pointer">
                  {post.author.username}
                </span>
                &nbsp;
                <span className="text-tertiary hidden sm:block">
                  @{post.author.username}
                </span>
                {showPlanet && (
                  <>
                    &nbsp;
                    <CgArrowRight size={16} className="text-tertiary" />
                    &nbsp;
                    <NavLink
                      href={`/planet/${post.planet.name}`}
                      className={`font-medium hover:underline cursor-pointer ${
                        colors[index % 6]
                      }`}
                    >
                      {post.planet.name}
                    </NavLink>
                  </>
                )}
                <span className="text-tertiary hidden sm:block">
                  &nbsp;&middot;&nbsp;{post.timeSince}
                </span>
              </div>

              <span className="text-tertiary sm:hidden block text-xs">
                @{post.author.username}&nbsp;&middot;&nbsp;{post.timeSince}
              </span>

              <NavLink
                href={post.relativeURL}
                className="text-base font-medium text-primary hidden sm:block"
              >
                {post.title}
              </NavLink>
            </div>
          </div>

          <div className="mx-3 sm:mx-16">
            <NavLink
              href={post.relativeURL}
              className="text-base font-medium text-primary sm:hidden block mb-3"
            >
              {post.title}
            </NavLink>

            <PostText post={post} measure={measure} />

            {post.imageURLs.length > 0 && (
              <div className="cursor-pointer relative aspect-ratio-16/9 object-contain w-full bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-900 dark:border-gray-800 hover:bg-gray-200">
                <Image
                  loading="eager"
                  alt="Image"
                  layout="fill"
                  src={post.imageURLs[0]}
                  className="rounded-md object-cover"
                />
              </div>
            )}

            <PostEmbed post={post} measure={measure} />
          </div>

          <PostActions post={post} />
        </div>
      </div>
    </article>
  )
}

export default React.memo(Post)
