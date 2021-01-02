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
      <div className="pb-0.5">
        <article
          onClick={() => {
            if (!showFullText) router.push(post.relativeUrl)
          }}
          className={`${className} ${
            !showFullText ? 'cursor-pointer' : ''
          } bg-white dark:bg-gray-900 relative flex md:rounded pt-3 pl-3 md:px-4 pr-3 pb-1`}
        >
          {(post.pinned || post.pinnedByAuthor) && (
            <Tippy
              content={`Pinned to ${
                post.pinned && !post.pinnedByAuthor
                  ? `+${post.planet.name}`
                  : ''
              }${
                !post.pinned && post.pinnedByAuthor
                  ? `@${post.author.username}`
                  : ''
              }${
                post.pinned && post.pinnedByAuthor
                  ? `+${post.planet.name} and @${post.author.username}`
                  : ''
              }`}
            >
              <div
                className="absolute top-2 right-3 cursor-pointer"
                style={{
                  color:
                    colorsMap[
                      post.planet && post.planet.color
                        ? post.planet.color
                        : 'blue'
                    ]
                }}
              >
                <TiPinOutline size={22} style={{ marginTop: '-1px' }} />
              </div>
            </Tippy>
          )}

          <div className="flex-grow">
            <div className="text-base flex items-center flex-wrap">
              <UserPopup user={post.author}>
                <UserAvatar
                  user={post.author}
                  className="cursor-pointer w-6 h-6 mr-2 transition hover:opacity-90"
                />
              </UserPopup>
              {post.author ? (
                <UserPopup user={post.author}>
                  <span className="text-secondary font-semibold hover:underline cursor-pointer leading-normal">
                    {post.author.name}
                  </span>
                </UserPopup>
              ) : (
                <span className="text-secondary font-semibold hover:underline cursor-pointer">
                  [deleted]
                </span>
              )}

              {post.planet && showPlanet && (
                <>
                  &nbsp;
                  <CgArrowRight size={16} className="text-mid inline-block" />
                  &nbsp;
                  <PlanetPopup planet={post.planet}>
                    <span
                      className={`font-semibold hover:underline cursor-pointer leading-normal`}
                      style={{ color: colorsMap[post.planet.color] }}
                    >
                      {post.planet.name}
                    </span>
                  </PlanetPopup>
                </>
              )}
              <span className="text-mid">
                &nbsp;&middot;&nbsp;{post.timeSince}
              </span>
            </div>

            {post.title && (
              <NavLink
                href={post.relativeUrl}
                className="text-base text-primary pt-2 block break-long-words"
              >
                <Twemoji options={{ className: 'twemoji' }}>
                  {post.title}
                </Twemoji>
              </NavLink>
            )}

            <PostText
              post={post}
              textContent={post.textContent}
              showFullText={showFullText}
            />

            <PostImages post={post} />

            <PostEmbed post={post} />

            <PostActions post={post} setEditing={setEditing} />
          </div>
        </article>
      </div>
    </>
  )
}
