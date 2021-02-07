import React, { useState } from 'react'
import EditPostModal from '@/components/modals/EditPostModal'
import { RiRocketFill } from 'react-icons/ri'
import { FiAlignLeft, FiLink, FiMessageCircle } from 'react-icons/fi'
import {
  HiLink,
  HiMenuAlt2,
  HiChatAlt2,
  HiDotsHorizontal,
  HiGlobe,
  HiGlobeAlt,
  HiChevronDown,
  HiChevronUp
} from 'react-icons/hi'
import { Link, useHistory } from 'react-router-dom'
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
import { TiPin } from 'react-icons/ti'
import UserAvatar from '@/components/avatars/UserAvatar'
import PlanetAvatar from '@/components/planet/PlanetAvatar'
import PlanetPopup from '@/components/popups/PlanetPopup'
import UserPopup from '@/components/popups/UserPopup'

export default function Post({
  postData,
  planet = false,
  embed = false,
  thumbnail = false,
  link = false,
  draggable = false,
  expandable = false,
  actionsLast = false,
  className = ''
}) {
  const [editing, setEditing] = useState(false)
  const [post, setPost] = useState(postData)

  const hasEmbed =
    post.textContent ||
    post.linkUrl ||
    (post.imageUrls && post.imageUrls.length > 0)

  const [{ opacity }, dragRef] = useDrag({
    item: { id: post.id, type: DragItemTypes.POST },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  })

  const [expanded, setExpanded] = useState(false)

  const { push } = useHistory()

  return (
    <article
      ref={draggable ? dragRef : null}
      style={{ opacity }}
      onClick={() => {
        // if (link) push(post.relativeUrl)
      }}
      className={`${className} ${
        link ? 'cursor-pointer' : ''
      } relative transition dark:hover:bg-gray-775 pt-3 px-4 pb-1.5`}
    >
      <EditPostModal post={post} setOpen={setEditing} open={editing} />
      <div className="flex flex-row-reverse lg:flex-row w-full">
        {thumbnail && <Thumbnail post={post} />}

        <div className="flex-grow">
          <div className="flex flex-wrap items-center text-13 font-medium text-tertiary pb-1">
            {post.pinned && (
              <Tippy content={`Pinned to +${post.planet.name}`}>
                <div className="mr-1.5">
                  <TiPin className="h-5 w-5 text-accent" />
                </div>
              </Tippy>
            )}
            {planet && (
              <>
                <PlanetPopup planet={post.planet}>
                  <PlanetAvatar
                    planet={post.planet}
                    className="h-5 w-5 mr-1.5"
                  />
                </PlanetPopup>
                <PlanetPopup planet={post.planet}>
                  <span className="text-accent hover:underline cursor-pointer">
                    +{post.planet.name}
                  </span>
                </PlanetPopup>
                &nbsp;&middot;&nbsp;
              </>
            )}
            <UserPopup user={post.author}>
              <UserAvatar
                user={post.author}
                className="rounded-full h-5 w-5 mr-1.5 cursor-pointer"
              />
            </UserPopup>
            <UserPopup user={post.author}>
              <span className="hover:underline cursor-pointer">
                {post.author.username}
              </span>
            </UserPopup>
            &nbsp;&middot;&nbsp;
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
          <Link to={post.relativeUrl} className="text-secondary text-base">
            {post.title || post?.meta?.title || '(untitled)'}
          </Link>

          {!actionsLast && (
            <div className="hidden lg:block pt-0.5 -ml-2">
              <Actions
                {...{
                  post,
                  setPost,
                  expanded,
                  setExpanded,
                  hasEmbed,
                  expandable
                }}
              />
            </div>
          )}
        </div>
      </div>

      {!actionsLast && (
        <div className="block lg:hidden pt-2 -mr-2">
          <Actions
            {...{ post, setPost, expanded, setExpanded, hasEmbed, expandable }}
          />
        </div>
      )}

      {hasEmbed && (embed || expanded) && <Embed post={post} />}

      {actionsLast && (
        <div className="-mr-2 lg:-ml-2">
          <Actions
            {...{ post, setPost, expanded, setExpanded, hasEmbed, expandable }}
          />
        </div>
      )}
    </article>
  )
}

function Embed({ post }) {
  return (
    <div className="py-2 space-y-2 flex flex-col lg:max-w-screen-sm">
      {post.linkUrl && (
        <>
          {ReactPlayer.canPlay(post.linkUrl) ? (
            <div className="aspect-h-9 aspect-w-16 ">
              <ReactPlayer
                className="react-player"
                url={post.linkUrl}
                width="100%"
                height="100%"
              />
            </div>
          ) : (
            <>
              {post.meta && post.meta.title ? (
                <a
                  to={post.linkUrl}
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                  className="mt-2 block rounded-md border dark:border-gray-700 transition"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex items-start">
                    <div className="w-24 h-24 relative flex-shrink-0 rounded-l-md">
                      {post.thumbnailUrl || post.logoUrl ? (
                        <img
                          src={post.thumbnailUrl || post.logoUrl}
                          className="rounded-l-md object-cover h-full w-full"
                        />
                      ) : (
                        <div className="flex w-24 h-24 rounded-l-md border-r border-gray-200 dark:border-gray-800">
                          <FiLink className="w-8 h-8 m-auto text-tertiary" />
                        </div>
                      )}
                    </div>

                    <div
                      className={`flex flex-col px-3 py-2 cursor-pointer h-24`}
                    >
                      <div className="font-medium line-clamp-1 text-secondary text-base">
                        {post.meta && post.meta.title
                          ? post.meta.title
                          : post.linkUrl}
                      </div>

                      <div className="text-xs font-medium text-tertiary line-clamp-1 mt-1">
                        {post.meta && post.meta.description
                          ? post.meta.description
                          : ''}
                      </div>

                      <div className="mt-auto flex items-center pt-3">
                        {post.logoUrl && (
                          <div className="inline-block w-4 h-4 mr-3">
                            <img
                              alt={post.domain}
                              src={post.logoUrl}
                              className="w-4 h-4 object-cover"
                            />
                          </div>
                        )}
                        <div className="inline-block text-tertiary text-xs line-clamp-1">
                          {post.domain}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ) : (
                <a
                  to={post.linkUrl}
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                  className="text-sm text-accent cursor-pointer hover:underline border dark:border-gray-700 p-2.5 rounded-md"
                >
                  {post.linkUrl}
                </a>
              )}
            </>
          )}
        </>
      )}

      {post.imageUrls.length > 0 && (
        <div className="relative max-w-screen-sm">
          <img src={post.imageUrls[0]} className="object-cover w-full h-full" />
        </div>
      )}

      {post.textContent && (
        <div
          dangerouslySetInnerHTML={{ __html: post.textContent }}
          className="prose prose-sm dark:prose-dark max-w-none border dark:border-gray-700 p-2.5 rounded-md"
        />
      )}
    </div>
  )
}

function Actions({
  post,
  setPost,
  expanded,
  setExpanded,
  hasEmbed,
  expandable
}) {
  return (
    <div className="space-x-1 flex items-center justify-items-end lg:justify-start flex-row-reverse lg:flex-row">
      <Rocket post={post} setPost={setPost} />
      <CommentCount post={post} />
      {expandable && hasEmbed && <Expand {...{ expanded, setExpanded }} />}
      <Options post={post} />
    </div>
  )
}

function Rocket({ post, setPost }) {
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
      className={`action-chip ${
        post.isRocketed ? 'text-red-400' : 'text-tertiary'
      }`}
    >
      <RiRocketFill className="w-4 h-4" />
      <div className="ml-1.5">{post.rocketCount}</div>
    </div>
  )
}

function CommentCount({ post }) {
  return (
    <Link to={post.relativeUrl} className={`action-chip text-tertiary`}>
      <HiChatAlt2 className="w-5 h-5 mr-1.5" />
      {post.commentCount}
    </Link>
  )
}

function Expand({ expanded, setExpanded }) {
  return (
    <Tippy
      placement="right"
      content={expanded ? 'Hide Details' : 'Show Details'}
    >
      <div
        className={`mr-1.5 p-1 inline-block items-center cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition text-tertiary`}
        onClick={e => {
          e.stopPropagation()
          e.preventDefault()
          setExpanded(!expanded)
        }}
      >
        {expanded ? (
          <HiChevronUp className="w-5 h-5" />
        ) : (
          <HiChevronDown className="w-5 h-5" />
        )}
      </div>
    </Tippy>
  )
}

function Options({ post }) {
  return (
    <div className="inline-flex items-center cursor-pointer text-mid p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition">
      <HiDotsHorizontal className="w-5 h-5" />
    </div>
  )
}

function Thumbnail({ post }) {
  return (
    <div className="pl-4 lg:pl-0 lg:pr-4">
      <div className={`relative w-14 h-14 lg:w-24 lg:h-16 flex-shrink-0`}>
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
