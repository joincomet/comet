import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from '../NavLink'
import {
  FiFolderPlus,
  FiMessageCircle,
  FiShare,
  FiMoreHorizontal,
  FiFolder
} from 'react-icons/fi'
import { BiRocket } from 'react-icons/bi'
import { AnimatePresence, motion } from 'framer-motion'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '@/lib/ItemTypes'
import { getEmptyImage } from 'react-dnd-html5-backend'

function Post({ post, className, style, index, measure }) {
  const chip =
    'cursor-pointer px-3 py-2 text-tertiary inline-flex flex-row items-center rounded-full dark:border-gray-700 border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out'

  const [toast, setToast] = useState(null)

  const [{ isDragging }, dragRef, preview] = useDrag({
    item: { post, type: ItemTypes.POST },
    begin: () => {
      document.body.classList.add('cursor-grabbing')
    },
    end: (item, monitor) => {
      document.body.classList.remove('cursor-grabbing')
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        setToast({ post: item.post, folder: dropResult })
        setTimeout(() => setToast(null), 1000)
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  useEffect(() => preview(getEmptyImage(), { captureDraggingState: true }), [])

  return (
    <article
      ref={dragRef}
      className={`relative pb-2 sm:pb-5 select-none outline-none ${
        className || ''
      }`}
      style={style}
      data-index={index}
    >
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <AnimatePresence>
          {toast && (
            <motion.div
              className="px-6 py-3 dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-md text-medium text-sm inline-flex items-center flex-no-wrap"
              initial={{
                scale: 0.75,
                opacity: 0
              }}
              animate={{
                scale: 1,
                opacity: 1
              }}
              exit={{
                scale: 0.75,
                opacity: 0
              }}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
            >
              <FiFolder
                className={`${
                  toast.folder.color || 'text-blue-500'
                } h-5 w-5 mr-6`}
              />
              {`Added to ${toast.folder.name}`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className={`${isDragging ? '' : 'cursor-grab'} ${
          isDragging || toast ? 'opacity-50' : 'opacity-100'
        } duration-150 transition ease-in-out pt-5 pb-3 bg-white border border-gray-100 shadow dark:border-gray-800 dark:bg-gray-800 sm:rounded-xl`}
      >
        <div className="flex flex-row pl-5 pr-5 sm:pl-8 sm:pr-5">
          <NavLink href={`/@${post.author.username}`}>
            <img
              alt={post.author.username}
              src={post.author.profile.avatarURL}
              className="object-cover object-center w-8 h-8 bg-gray-200 rounded-full"
            />
          </NavLink>
          <div className="flex flex-col flex-grow pr-12 ml-4">
            <div className="text-xs">
              <NavLink
                href={`/@${post.author.username}`}
                className="font-semibold text-tertiary hover:underline"
              >
                {post.author.username}
              </NavLink>
              <span className="text-tertiary"> in </span>
              <NavLink
                href={`/+${post.planet.name}`}
                className="font-semibold text-accent hover:underline"
              >
                +{post.planet.name}
              </NavLink>
            </div>
            <div className="text-xs mt-0.5">
              <span className="text-tertiary">{post.timeSince}</span>
            </div>
          </div>
          <div className="ml-auto font-mono text-xs text-disabled">
            {index + 1}
          </div>
        </div>
        <div className="px-5 pt-3 pb-3 sm:pl-20 sm:pr-20">
          <div className="text-base font-semibold text-primary">
            {post.title}
          </div>
          {post.textContent ? (
            <div
              className="mt-1 text-sm text-secondary line-clamp-3"
              dangerouslySetInnerHTML={{ __html: post.textContent }}
            />
          ) : (
            ''
          )}

          {post.imageURLs && post.imageURLs.length > 0 ? (
            <img
              onLoad={measure}
              alt={post.title}
              src={post.imageURLs[0]}
              style={{ maxHeight: '19.8125rem' }}
              className="object-contain object-center w-full mt-4 max-w-full bg-gray-100 dark:bg-gray-900 dark:border-gray-800 border border-gray-200 hover:bg-gray-200 rounded-2xl"
            />
          ) : (
            post.embed &&
            post.embed.links &&
            post.embed.links.thumbnail &&
            post.embed.links.thumbnail.length > 0 && (
              <a
                href={post.linkURL}
                target="_blank"
                rel="noreferrer noopener nofollow"
                className="flex flex-row items-start mt-4 bg-gray-100 border border-gray-200 rounded-lg dark:border-gray-800 dark:bg-gray-900 hover:bg-gray-200 hover:text-blue-500"
              >
                <img
                  src={post.embed.links.thumbnail[0].href}
                  className="object-cover object-center w-32 h-32 bg-white dark:bg-gray-800 rounded-l-lg"
                />
                <div className="flex flex-col h-32 px-6 py-3 cursor-pointer">
                  <div className="text-sm font-semibold line-clamp-2 hover:text-blue-500 transition duration-150 ease-in-out">
                    {post.embed.meta.title}
                  </div>

                  <div className="mt-1 text-xs font-medium text-tertiary line-clamp-2">
                    {post.embed.meta.description}
                  </div>

                  <div className="flex flex-row items-start mt-auto">
                    <img
                      v-if="post.embed.links.icon && post.embed.links.icon.length > 0"
                      src={post.embed.links.icon[0].href}
                      className="object-contain w-4 h-4 mr-3 rounded-sm"
                    />
                    <div className="text-tertiary">
                      <div className="text-xs font-mono">{post.domain}</div>
                    </div>
                  </div>
                </div>
              </a>
            )
          )}
        </div>
        <div className="flex flex-row items-center px-5 sm:px-20 -mr-3 -ml-3">
          <div className={chip}>
            <BiRocket className="w-5 h-5" />
            <span className="ml-3 text-sm font-semibold">
              {post.rocketCount}
            </span>
          </div>

          <div className={`ml-4 ${chip}`}>
            <FiMessageCircle className="w-5 h-5" />
            <span className="ml-3 text-sm font-semibold">
              {post.commentCount}
            </span>
          </div>

          <div className={`${chip} ml-auto`}>
            <FiMoreHorizontal className="w-5 h-5 text-disabled" />
          </div>

          <div className={`${chip} ml-4`}>
            <FiShare className="w-5 h-5 text-green-500" />
          </div>

          <div className={`${chip} ml-4`}>
            <FiFolderPlus className="w-5 h-5 text-blue-500" />
          </div>
        </div>
      </div>
    </article>
  )
}

export default React.memo(Post)
