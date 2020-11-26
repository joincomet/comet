import React, { useEffect, useState } from 'react'
import {
  FiFolder,
  FiStar,
  FiUser,
  FiLink,
  FiAlignLeft,
  FiMessageCircle,
  FiMoreHorizontal,
  FiShare,
  FiFolderPlus,
  FiEye,
  FiArrowRight
} from 'react-icons/fi'
import { BsArrowRight } from 'react-icons/bs'
import { BiRocket } from 'react-icons/bi'
import { AnimatePresence, motion } from 'framer-motion'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '@/ItemTypes'
import { getEmptyImage } from 'react-dnd-html5-backend'
import Image from 'next/image'
import NavLink from '@/components/NavLink'

const chip =
  'cursor-pointer px-3 py-2 text-tertiary inline-flex flex-row items-center rounded-full dark:border-gray-700 border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out'

function Post({ post, className, style, index, measure, layout }) {
  const [toast, setToast] = useState(null)
  const [timeoutId, setTimeoutId] = useState(null)

  const [{ isDragging }, dragRef, preview] = useDrag({
    item: { post, type: ItemTypes.POST },
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

  useEffect(() => preview(getEmptyImage(), { captureDraggingState: true }), [])

  return (
    <article
      className={`flex outline-none ${className || ''}`}
      style={style}
      data-index={index}
    >
      <div ref={dragRef} className="relative flex-shrink w-full">
        <div
          className={`absolute inset-x-0 top-1/2 z-50 -translate-y-1/2 transform transition ${
            toast ? 'translate-x-0' : '-translate-x-full delay-150'
          }`}
        >
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: 0
                }}
                animate={{
                  opacity: 1,
                  x: '50%'
                }}
                exit={{
                  opacity: 0,
                  x: '100%'
                }}
                transition={{ duration: 0.15, ease: 'easeInOut' }}
              >
                <div
                  style={{ backgroundColor: toast.folder.color || '#3b82f6' }}
                  className={`transform -translate-x-1/2 pr-6 h-12 shadow-xl rounded-md text-medium text-sm inline-flex items-center flex-nowrap whitespace-nowrap`}
                >
                  {toast.folder && (
                    <>
                      <div className="w-9 h-9 bg-gray-800 mx-4 rounded-full inline-flex items-center shadow">
                        {toast.folder.name === 'Favorites' ? (
                          <FiStar
                            style={{ color: toast.folder.color || '#eab308' }}
                            className={`h-5 w-5 m-auto`}
                          />
                        ) : (
                          <FiFolder
                            style={{ color: toast.folder.color || '#3b82f6' }}
                            className={`h-5 w-5 m-auto`}
                          />
                        )}
                      </div>

                      <span className="text-black">{`Added to ${toast.folder.name}`}</span>

                      <span className="hover:underline cursor-pointer ml-6 text-black">
                        Undo
                      </span>
                    </>
                  )}

                  {toast.user && (
                    <>
                      <Image
                        loading="eager"
                        width={36}
                        height={36}
                        alt={toast.user.profile.realName}
                        className="object-cover w-9 h-9 rounded-full mx-4 shadow"
                        src={toast.user.avatarURL}
                      />
                      {`Sent to ${toast.user.profile.realName}`}
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          className={`${
            isDragging || toast ? 'opacity-40' : 'opacity-100'
          } duration-150 transition ease-in-out`}
        >
          <div
            style={{ marginTop: '-1px' }}
            className="mx-5 sm:mx-72 flex bg-white dark:bg-gray-800 border-t border-l border-r border-gray-200 dark:border-gray-900 pl-3 py-3 pr-16"
          >
            <NavLink
              href={`/user/${post.author.username}`}
              className={`w-10 h-10 flex-shrink-0 rounded-full ${
                post.author.avatarURL ? '' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {post.author.avatarURL ? (
                <Image
                  src={post.author.avatarURL}
                  height={40}
                  width={40}
                  className="rounded-full object-cover object-center block h-8 w-8"
                  loading="eager"
                />
              ) : (
                <FiUser size={20} className="m-2.5 text-gray-500" />
              )}
            </NavLink>

            <div className="flex flex-col flex-grow ml-3">
              <div className="text-tertiary text-xs font-semibold flex items-center">
                {post.author.username}&nbsp;
                <BsArrowRight size={16} />
                &nbsp;
                <span className="text-accent">
                  {post.planet.name}&nbsp;&middot;&nbsp;
                </span>
                {post.timeSince}&nbsp;&middot;&nbsp;100k views
              </div>
              <NavLink
                href={post.relativeURL}
                className="text-base font-semibold text-primary mt-1"
              >
                {post.title}
              </NavLink>

              {post.textContent && (
                <div
                  dangerouslySetInnerHTML={{ __html: post.textContent }}
                  className="prose-sm p-3 rounded-md border dark:border-gray-700 mt-3 text-primary"
                />
              )}

              {post.imageURLs.length > 0 && (
                <div className="relative aspect-ratio-16/9 object-contain w-full mt-4 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-900 dark:border-gray-800 hover:bg-gray-200">
                  <Image
                    loading="eager"
                    alt="Image"
                    layout="fill"
                    src={post.imageURLs[0]}
                    className="rounded-md object-contain"
                  />
                </div>
              )}

              {post.linkURL && (
                <a
                  href={post.linkURL}
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                  className="rounded-md flex flex-row items-start mt-3 bg-gray-100 border border-gray-200 rounded-m dark:border-gray-800 dark:bg-gray-900 hover:bg-gray-200 hover:text-blue-500"
                >
                  <div className="w-32 h-32 relative">
                    {post.thumbnailURL || post.logoURL ? (
                      <Image
                        loading="eager"
                        src={post.thumbnailURL || post.logoURL}
                        layout="fill"
                        className="object-cover object-center bg-white rounded-l-md dark:bg-gray-800"
                      />
                    ) : (
                      <div className="flex w-32 h-32 rounded-l-md dark:bg-gray-700">
                        <FiLink className="w-8 h-8 m-auto text-tertiary" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col h-32 px-6 py-3 cursor-pointer">
                    <div className="text-sm font-semibold transition duration-150 ease-in-out line-clamp-2 hover:text-blue-500">
                      {post.meta && post.meta.title
                        ? post.meta.title
                        : post.linkURL}
                    </div>

                    <div className="mt-1 text-xs font-medium text-secondary line-clamp-2">
                      {post.meta && post.meta.description
                        ? post.meta.description
                        : 'Could not embed this link'}
                    </div>

                    <div className="flex flex-row items-center mt-auto text-tertiary text-xs">
                      {post.logoURL && (
                        <div className="inline-block w-4 h-4 mr-3">
                          <Image
                            loading="eager"
                            src={post.logoURL}
                            width={16}
                            height={16}
                          />
                        </div>
                      )}
                      {post.domain}
                    </div>
                  </div>
                </a>
              )}

              <div className="flex flex-row items-center justify-between -mx-3 -ml-3 mt-auto pt-3">
                <div className={chip}>
                  <BiRocket className="w-5 h-5" />
                  <span className="ml-3 text-sm font-medium">
                    {post.rocketCount}
                  </span>
                </div>

                <div className={`${chip}`}>
                  <FiMessageCircle className="w-5 h-5" />
                  <span className="ml-3 text-sm font-medium">
                    {post.commentCount}
                  </span>
                </div>

                {/*<div className={`${chip}`}>
                  <FiMoreHorizontal className="w-5 h-5 text-disabled" />
                </div>*/}

                <div className={`${chip} group`}>
                  <FiShare className="w-5 h-5 group-hover:text-green-500 transition duration-150 ease-in-out" />
                </div>

                <div className={`${chip} group`}>
                  <FiFolderPlus className="w-5 h-5 group-hover:text-blue-500 transition duration-150 ease-in-out" />
                </div>

                <div className={`${chip} text-disabled`}>
                  <FiMoreHorizontal className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default React.memo(Post)
