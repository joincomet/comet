import React, { useEffect, useRef } from 'react'
import { NavLink } from './NavLink'
import {
  FiFolderPlus,
  FiMessageCircle,
  FiShare,
  FiMoreHorizontal
} from 'react-icons/fi'
import { BiRocket } from 'react-icons/bi'
import { motion } from 'framer-motion'

/*function getStyle(provided, snapshot, style) {
  if (!snapshot || !snapshot.isDropAnimating) {
    return {
      ...provided.draggableProps.style,
      ...style
    }
  }
  const { moveTo, curve, duration } = snapshot.dropAnimation
  const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`

  return {
    ...provided.draggableProps.style,
    ...style,
    transform: `${translate}`,
    transition: `all ${curve} ${duration}s`
  }
}*/

function getStyle(provided, snapshot, style) {
  if (!style) {
    return {
      ...provided.draggableProps.style
    }
  }

  const { moveTo, curve, duration } = snapshot.dropAnimation
  const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`

  return {
    ...provided.draggableProps.style,
    ...style
  }
}

function Post({
  post,
  className,
  isDragging,
  provided,
  snapshot,
  isClone,
  isGroupedOver,
  style,
  index,
  mousePosition,
  measure
}) {
  const chip =
    'px-3 py-2 text-tertiary inline-flex flex-row items-center rounded-full dark:border-gray-700 border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out'

  const ref = useRef(null)

  if (!provided)
    provided = { innerRef: ref, draggableProps: {}, dragHandleProps: {} }

  return (
    <article
      className={`pb-2 sm:pb-5 select-none outline-none ${className || ''}`}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={
        snapshot && snapshot.isDragging
          ? getStyle(provided, snapshot, style)
          : {}
      }
      data-is-dragging={isDragging}
      data-testid={post.id}
      data-index={index}
    >
      <motion.div
        animate={{
          scale: isDragging ? 0.5 : 1,
          opacity: isDragging ? 0.3 : 1
        }}
        transition={{ duration: isDragging ? 0.15 : 0, ease: 'easeInOut' }}
        style={
          mousePosition
            ? {
                originX: `${mousePosition.x}px`,
                originY: `${mousePosition.y}px`
              }
            : {}
        }
        className={`pt-5 pb-3 bg-white border border-gray-100 shadow cursor-grab dark:border-gray-800 dark:bg-gray-800 sm:rounded-xl ${
          isDragging ? 'opacity-0 shadow-lg' : ''
        }`}
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

          <div className="inline-flex flex-row items-center px-3 py-2 ml-auto transition duration-150 ease-in-out rounded-full text-tertiary hover:bg-gray-200 dark:hover:bg-gray-700">
            <FiMoreHorizontal className="w-5 h-5 text-disabled" />
          </div>

          <div className="inline-flex flex-row items-center px-3 py-2 ml-4 transition duration-150 ease-in-out rounded-full text-tertiary hover:bg-gray-200 dark:hover:bg-gray-700">
            <FiShare className="w-5 h-5 text-green-500" />
          </div>

          <div className="inline-flex flex-row items-center px-3 py-2 ml-4 transition duration-150 ease-in-out rounded-full text-tertiary hover:bg-gray-200 dark:hover:bg-gray-700">
            <FiFolderPlus className="w-5 h-5 text-blue-500" />
          </div>
        </div>
      </motion.div>
    </article>
  )
}

export default React.memo(Post)
