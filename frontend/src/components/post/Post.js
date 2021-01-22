import React, { useState } from 'react'
import { useRouter } from 'next/router'
import EditPostModal from '@/components/post/EditPostModal'
import { BiRocket } from 'react-icons/bi'
import { RiRocketFill } from 'react-icons/ri'
import { FiAlignLeft, FiLink, FiMessageCircle } from 'react-icons/fi'
import {
  HiLink,
  HiMenuAlt2,
  HiChatAlt2,
  HiDotsHorizontal,
  HiGlobe,
  HiGlobeAlt
} from 'react-icons/hi'
import NavLink from '@/components/NavLink'
import Tippy from '@tippyjs/react'
import { useDrag } from 'react-dnd'
import { DragItemTypes } from '@/lib/DragItemTypes'
import {
  useRocketPostMutation,
  useUnrocketPostMutation
} from '@/lib/mutations/postMutations'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { useLoginStore } from '@/lib/stores/useLoginStore'
import ReactPlayer from 'react-player'

export default function Post({
  postData,
  hidePlanet = false,
  showDetails = false,
  hideThumbnail = false,
  className = ''
}) {
  const [editing, setEditing] = useState(false)
  const [post, setPost] = useState(postData)

  const [{ opacity }, dragRef] = useDrag({
    item: { id: post.id, type: DragItemTypes.POST },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  })

  return (
    <article
      ref={dragRef}
      style={{ opacity }}
      onClick={() => {
        // if (!showDetails) router.push(post.relativeUrl)
      }}
      className={`${className} ${
        !showDetails ? 'cursor-pointer' : ''
      } relative transition dark:hover:bg-gray-775 py-2 pr-2 md:pr-6 pl-2`}
    >
      <EditPostModal post={post} setOpen={setEditing} open={editing} />
      <div className="flex w-full">
        <div>
          <Rocket post={post} setPost={setPost} desktop />
        </div>
        <div className="flex flex-grow">
          {!hideThumbnail && (
            <Thumbnail post={post} className="hidden md:block pr-3" />
          )}

          <div className="pr-3 flex-grow">
            <div className="flex truncate items-center text-13 font-medium text-tertiary pb-1">
              {!hidePlanet && (
                <>
                  {post.planet.avatarUrl && (
                    <img
                      className="rounded-full h-5 w-5 object-cover mr-1.5"
                      src={post.planet.avatarUrl}
                    />
                  )}
                  <NavLink
                    href={`/planet/${post.planet.name}`}
                    className="text-accent hover:underline cursor-pointer"
                  >
                    +{post.planet.name}
                  </NavLink>
                  &nbsp;&middot;&nbsp;
                </>
              )}
              {post.author.avatarUrl && (
                <img
                  className="rounded-full h-5 w-5 object-cover mr-1"
                  src={post.author.avatarUrl}
                />
              )}
              {post.author.username} &middot;&nbsp;
              <Tippy content={post.timeSinceFull}>
                <span>{post.timeSince}</span>
              </Tippy>
              &nbsp;&middot; ({post.linkUrl && post.domain}
              {!post.linkUrl &&
                post.imageUrls &&
                post.imageUrls.length > 0 &&
                'image post'}
              {!post.linkUrl &&
                (!post.imageUrls || post.imageUrls.length === 0) &&
                'text post'}
              )
            </div>
            <NavLink
              href={post.relativeUrl}
              className="text-secondary text-base"
            >
              {post.title || '(untitled)'}
            </NavLink>

            {showDetails && (
              <div className="pt-2">
                {post.linkUrl && ReactPlayer.canPlay(post.linkUrl) && (
                  <div className="aspect-h-9 aspect-w-16 w-full md:max-w-screen-sm">
                    <ReactPlayer
                      className="react-player"
                      url={post.linkUrl}
                      width="100%"
                      height="100%"
                    />
                  </div>
                )}

                {post.imageUrls && post.imageUrls.length > 0 && (
                  <div className="relative max-w-screen-sm">
                    <img
                      src={post.imageUrls[0]}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                {post.textContent && (
                  <div
                    dangerouslySetInnerHTML={{ __html: post.textContent }}
                    className="prose prose-sm dark:prose-dark max-w-none"
                  />
                )}
              </div>
            )}

            <div className="pt-2 hidden md:flex items-center">
              <div className="ml-auto" />
              <CommentCount post={post} />

              <Options post={post} />
            </div>
          </div>

          {!hideThumbnail && (
            <Thumbnail post={post} className="block md:hidden ml-auto" />
          )}
        </div>
      </div>
      <div className="pt-2 flex md:hidden items-center justify-end">
        <Options post={post} />

        <CommentCount post={post} />

        <Rocket post={post} setPost={setPost} mobile />
      </div>
    </article>
  )
}

function Rocket({ post, setPost, desktop = true, mobile = false }) {
  const rocket = useRocketPostMutation({
    onMutate: () => {
      setPost({ ...post, rocketCount: post.rocketCount + 1, isRocketed: true })
    }
  })

  const unrocket = useUnrocketPostMutation({
    onMutate: () => {
      setPost({ ...post, rocketCount: post.rocketCount - 1, isRocketed: false })
    }
  })

  const currentUser = useCurrentUser().data
  const { setLogin } = useLoginStore()
  const rocketVariables = { postId: post.id }
  const toggleRocket = () => {
    if (!currentUser) {
      setLogin(true)
      return
    }
    if (post.isRocketed) unrocket.mutate(rocketVariables)
    else rocket.mutate(rocketVariables)
  }

  return (
    <div
      onClick={e => {
        e.stopPropagation()
        toggleRocket()
      }}
      className={`${
        mobile ? 'inline-flex md:hidden' : 'hidden md:block'
      } items-center cursor-pointer md:py-2 md:px-1 px-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
        post.isRocketed ? 'text-red-400' : 'text-tertiary'
      }`}
    >
      <RiRocketFill className="w-4 h-4" />
      <div className="md:mt-1.5 md:ml-0 ml-1.5 text-xs font-medium md:text-center">
        {post.rocketCount}
      </div>
    </div>
  )
}

function CommentCount({ post }) {
  return (
    <NavLink
      href={post.relativeUrl}
      className="inline-flex items-center text-tertiary text-xs font-medium h-7 px-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      <HiChatAlt2 className="w-5 h-5 mr-1.5" />
      {post.commentCount}
    </NavLink>
  )
}

function Options({ post }) {
  return (
    <div className="inline-flex items-center cursor-pointer text-mid p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
      <HiDotsHorizontal className="w-5 h-5" />
    </div>
  )
}

function Thumbnail({ post, className }) {
  return (
    <div className={className}>
      <div className={`relative w-14 h-14 md:w-24 md:h-16 flex-shrink-0`}>
        <div
          className="h-full w-full rounded dark:bg-gray-650 bg-gray-200 inline-flex items-center justify-center text-tertiary bg-cover bg-center bg-no-repeat"
          style={
            post.thumbnailUrl || post.logoUrl
              ? {
                  backgroundImage: `url(${post.thumbnailUrl || post.logoUrl})`
                }
              : {}
          }
        >
          {!(post.thumbnailUrl || post.logoUrl) &&
            (post.linkUrl ? (
              <HiGlobeAlt className="w-8 h-8" />
            ) : (
              <HiMenuAlt2 className="w-8 h-8" />
            ))}
        </div>
      </div>
    </div>
  )
}
