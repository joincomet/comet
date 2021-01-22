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
  HiDotsHorizontal
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

export default function Post({
  postData,
  showPlanet = true,
  showFullText = false,
  className = ''
}) {
  const router = useRouter()

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
        // if (!showFullText) router.push(post.relativeUrl)
      }}
      className={`${className} ${
        !showFullText ? 'cursor-pointer' : ''
      } relative transition dark:hover:bg-gray-775 py-2 pr-3 pl-2`}
    >
      <EditPostModal post={post} setOpen={setEditing} open={editing} />
      <div className="flex">
        <Rocket post={post} setPost={setPost} desktop />

        <Thumbnail post={post} className="hidden md:block pr-3" />

        <div className="pr-3 min-w-0">
          <div className="flex truncate items-center text-13 font-medium text-tertiary">
            {showPlanet && (
              <>
                {post.planet.avatarUrl && (
                  <img
                    className="rounded-full h-5 w-5 object-cover mr-1"
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
          <div className="pt-1 text-secondary text-base">
            {post.title || '(untitled)'}
          </div>
          <div className="md:flex items-center pt-1 hidden space-x-1">
            <CommentCount post={post} />
            <Options post={post} />
          </div>
        </div>

        <Thumbnail post={post} className="block md:hidden ml-auto" />
      </div>
      <div className="pt-2 flex md:hidden items-center">
        <CommentCount post={post} />

        <Options post={post} />

        <div className="ml-auto" />

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
        mobile ? 'flex md:hidden' : 'hidden md:flex'
      } md:flex-col flex-row items-center md:justify-center md:py-2 md:px-1 h-7 md:h-auto px-2 mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
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
    <div className="inline-flex items-center text-tertiary text-xs font-medium h-7 px-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
      <HiChatAlt2 className="w-5 h-5 mr-1.5" />
      {post.commentCount}
    </div>
  )
}

function Options({ post }) {
  return (
    <div className="inline-flex items-center text-mid p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
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
              <HiLink className="w-8 h-8" />
            ) : (
              <HiMenuAlt2 className="w-8 h-8" />
            ))}
        </div>
      </div>
    </div>
  )
}
