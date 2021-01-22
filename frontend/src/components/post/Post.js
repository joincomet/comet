import React, { useState } from 'react'
import { CgArrowRight } from 'react-icons/cg'
import { TiPinOutline } from 'react-icons/ti'
import NavLink from '@/components/NavLink'
import PostEmbed from '@/components/post/PostEmbed'
import PostActions from '@/components/post/PostActions'
import PostText from '@/components/post/PostText'
import UserAvatar from '@/components/user/UserAvatar'
import UserPopup from '@/components/user/UserPopup'
import PostImages from '@/components/post/PostImages'
import PlanetPopup from '@/components/planet/PlanetPopup'
import { useRouter } from 'next/router'
import Twemoji from 'react-twemoji'
import Tippy from '@tippyjs/react'
import EditPostModal from '@/components/post/EditPostModal'
import { colorsMap } from '@/lib/colorsMap'
import { BiRocket } from 'react-icons/bi'
import { FiAlignLeft, FiLink, FiMessageCircle } from 'react-icons/fi'

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
      <div>
        <article
          onClick={() => {
            if (!showFullText) router.push(post.relativeUrl)
          }}
          className={`${className} ${
            !showFullText ? 'cursor-pointer' : ''
          } border-t border-l border-r dark:border-gray-750 relative flex transition dark:hover:bg-gray-850`}
        >
          <div
            className="flex flex-col justify-center items-center p-3"
            style={{ marginTop: '-1px' }}
          >
            <BiRocket className="w-4 h-4 text-tertiary" />
            <div className="mt-1.5 text-xs font-medium text-secondary">
              {post.rocketCount}
            </div>
          </div>

          <div className="relative w-28 py-2">
            <div className="aspect-h-9 aspect-w-16 w-full rounded dark:bg-gray-750">
              {post.thumbnailUrl || post.logoUrl ? (
                <img
                  src={post.thumbnailUrl || post.logoUrl}
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <div className="flex items-center justify-center text-mid">
                  {post.linkUrl ? (
                    <FiLink className="w-1/2 h-1/2" />
                  ) : (
                    <FiAlignLeft className="w-1/2 h-1/2" />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="py-2 px-3">
            <div className="flex text-xs font-medium text-tertiary">
              {post.author.username} &middot; {post.timeSince}
            </div>
            <div className="pt-1 font-semibold text-secondary">
              {post.title || '(untitled)'}
            </div>
            <div className="pt-1.5 inline-flex items-center text-tertiary text-xs font-medium">
              <FiMessageCircle className="w-4 h-4 mr-1.5" />
              {post.commentCount}
            </div>
          </div>
        </article>
      </div>
    </>
  )
}
