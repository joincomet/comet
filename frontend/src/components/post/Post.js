import React, { useState } from 'react'
import { useRouter } from 'next/router'
import EditPostModal from '@/components/post/EditPostModal'
import { BiRocket } from 'react-icons/bi'
import { FiAlignLeft, FiLink, FiMessageCircle } from 'react-icons/fi'
import { HiLink, HiMenuAlt2 } from 'react-icons/hi'
import NavLink from '@/components/NavLink'
import Tippy from '@tippyjs/react'

export default function Post({
  post,
  showPlanet = true,
  showFullText = false,
  className = ''
}) {
  const router = useRouter()

  const [editing, setEditing] = useState(false)

  return (
    <>
      <EditPostModal post={post} setOpen={setEditing} open={editing} />
      <article
        onClick={() => {
          if (!showFullText) router.push(post.relativeUrl)
        }}
        className={`${className} ${
          !showFullText ? 'cursor-pointer' : ''
        } relative flex transition dark:hover:bg-gray-775 py-2 pr-3`}
      >
        <div className="flex flex-col justify-center items-center p-3">
          <BiRocket className="w-4 h-4 text-tertiary" />
          <div className="mt-1.5 text-xs font-medium text-secondary">
            {post.rocketCount}
          </div>
        </div>

        <Thumbnail post={post} className="hidden md:block pr-3" />

        <div className="">
          <div className="flex items-center text-13 font-medium text-tertiary">
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
          <div className="pt-0.5 text-secondary text-base">
            {post.title || '(untitled)'}
          </div>
          <div className="pt-1.5 inline-flex items-center text-tertiary text-xs font-medium">
            <FiMessageCircle className="w-4 h-4 mr-1.5" />
            {post.commentCount}
          </div>
        </div>

        <Thumbnail post={post} className="block md:hidden ml-auto pl-3" />
      </article>
    </>
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
