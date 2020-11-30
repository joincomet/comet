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
import { HiSwitchHorizontal } from 'react-icons/hi'
import { CgArrowRight } from 'react-icons/cg'
import { BiRocket } from 'react-icons/bi'
import { AnimatePresence, motion } from 'framer-motion'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '@/ItemTypes'
import { getEmptyImage } from 'react-dnd-html5-backend'
import Image from 'next/image'
import NavLink from '@/components/NavLink'
import { Tweet } from 'react-twitter-widgets'
import ReactPlayer from 'react-player/youtube'
import useDarkMode from 'use-dark-mode'
import { useMountedState } from 'react-use'

const colors = [
  'text-red-500',
  'text-amber-500',
  'text-green-500',
  'text-blue-500',
  'text-purple-500',
  'text-pink-500'
]

const chip =
  'cursor-pointer px-3 h-8 inline-flex flex-row items-center rounded-full dark:border-gray-700 border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 ease-in-out'

function Post({ post, className, style, index, measure, layout }) {
  const isMounted = useMountedState()

  const [toast, setToast] = useState(null)
  const [timeoutId, setTimeoutId] = useState(null)
  const [rocketed, setRocketed] = useState(false)

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

  const isTwitter = () =>
    post.linkURL &&
    !!post.linkURL.match(
      /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)(?:\/.*)?$/i
    )
  const tweetId = () =>
    isTwitter() ? post.linkURL.split('/status/')[1].split('/')[0] : null

  const isCustomEmbed = () =>
    post.linkURL && (isTwitter() || ReactPlayer.canPlay(post.linkURL))

  const darkMode = useDarkMode(false, {
    classNameDark: 'dark',
    classNameLight: 'light'
  })

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
          } duration-150 transition ease-in-out pb-3`}
        >
          <div className="sm:mx-3 2xl:mx-72 flex bg-white dark:bg-gray-800 sm:rounded-md shadow-md">
            <div className="flex flex-col flex-grow">
              <div className="flex items-start m-3">
                <NavLink
                  href={`/user/${post.author.username}`}
                  className={`w-10 h-10 relative mr-3 flex-shrink-0 rounded-full ${
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
                    &nbsp;
                    <CgArrowRight size={16} className="text-tertiary" />
                    &nbsp;
                    <span
                      className={`font-medium hover:underline cursor-pointer ${
                        colors[index % 6]
                      }`}
                    >
                      {post.planet.name}
                    </span>
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

                {post.textContent && (
                  <div
                    dangerouslySetInnerHTML={{ __html: post.textContent }}
                    className="prose-sm p-3 rounded-md border dark:border-gray-700 text-primary"
                  />
                )}

                {post.imageURLs.length > 0 && (
                  <div className="relative aspect-ratio-16/9 object-contain w-full bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-900 dark:border-gray-800 hover:bg-gray-200">
                    <Image
                      loading="eager"
                      alt="Image"
                      layout="fill"
                      src={post.imageURLs[0]}
                      className="rounded-md object-contain"
                    />
                  </div>
                )}

                {isCustomEmbed() && (
                  <div>
                    {isTwitter() && (
                      <Tweet
                        tweetId={tweetId()}
                        onLoad={() => {
                          measure()
                          setInterval(() => {
                            if (isMounted()) measure()
                          }, 500)
                        }}
                        options={{
                          align: 'center',
                          dnt: true,
                          theme: darkMode.value ? 'dark' : 'light'
                        }}
                      />
                    )}

                    {ReactPlayer.canPlay(post.linkURL) && (
                      <div className="rounded-md overflow-hidden">
                        <ReactPlayer controls={true} url={post.linkURL} />
                      </div>
                    )}
                  </div>
                )}

                {post.linkURL &&
                  !isCustomEmbed() &&
                  post.meta &&
                  post.meta.title && (
                    <a
                      href={post.linkURL}
                      target="_blank"
                      rel="noreferrer noopener nofollow"
                      className="rounded-md flex flex-row items-start bg-gray-100 border border-gray-200 rounded-m dark:border-gray-800 dark:bg-gray-900 hover:bg-gray-200 hover:text-blue-500"
                    >
                      <div className="w-32 h-32 relative flex-shrink-0">
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
                            : ''}
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

                {post.linkURL &&
                  !isCustomEmbed() &&
                  (!post.meta || !post.meta.title) && (
                    <a
                      href={post.linkURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline cursor-pointer mt-3 text-sm break-all"
                    >
                      {post.linkURL}
                    </a>
                  )}
              </div>

              <div className="flex flex-row items-center mx-3 sm:mx-16 mt-auto py-3">
                <div
                  className={`${chip} mr-3 ${
                    rocketed ? 'text-red-500' : 'text-tertiary'
                  }`}
                  onClick={() => setRocketed(!rocketed)}
                >
                  <BiRocket className={`w-4.5 h-4.5`} />
                  <span className="ml-3 text-sm font-medium">
                    {post.rocketCount}
                  </span>
                </div>

                <div className={`${chip} text-tertiary mr-3`}>
                  <FiMessageCircle className="w-4.5 h-4.5" />
                  <span className="ml-3 text-sm font-medium">
                    {post.commentCount}
                  </span>
                </div>

                <div className={`${chip} text-tertiary hidden sm:inline-flex`}>
                  <FiRepeat className="w-4.5 h-4.5" />
                  <span className="ml-3 text-sm font-medium">
                    {post.commentCount}
                  </span>
                </div>

                <div className={`${chip} text-tertiary group ml-auto mr-3`}>
                  <FiFolderPlus className="w-4.5 h-4.5 group-hover:text-blue-500 transition duration-150 ease-in-out" />
                </div>

                <div className={`${chip} text-tertiary group`}>
                  <FiShare className="w-4.5 h-4.5 group-hover:text-green-500 transition duration-150 ease-in-out" />
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
