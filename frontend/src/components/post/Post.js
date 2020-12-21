import React from 'react'
import { TiPinOutline } from 'react-icons/ti'
import { CgArrowRight } from 'react-icons/cg'
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

function Post({
  post,
  showPlanet = true,
  showFullText = false,
  className = ''
}) {
  const router = useRouter()
  return (
    <article
      onClick={() => {
        if (!showFullText) router.push(post.relativeUrl)
      }}
      className={`${className} ${
        !showFullText ? 'cursor-pointer' : ''
      } bg-white dark:bg-gray-900 relative flex rounded pt-2 pl-3 pr-3 md:pr-6 pb-1 mb-0.5`}
    >
      {post.pinned && (
        <TiPinOutline
          size={20}
          className="absolute top-3 right-3 text-accent"
        />
      )}

      <div className="pr-3">
        <UserPopup user={post.author}>
          <UserAvatar
            user={post.author}
            className="cursor-pointer w-12 h-12 transition hover:opacity-90"
            loading="eager"
          />
        </UserPopup>
      </div>

      <div className="flex-grow">
        <div className="text-base flex items-center flex-wrap">
          {post.author ? (
            <>
              <UserPopup user={post.author}>
                <span className="text-secondary font-semibold hover:underline cursor-pointer">
                  {post.author.name}
                </span>
              </UserPopup>
              &nbsp;
              <UserPopup user={post.author}>
                <span className="text-mid cursor-pointer">
                  @{post.author.username}
                </span>
              </UserPopup>
            </>
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
                  className={`font-semibold hover:underline cursor-pointer`}
                  style={{ color: post.planet.color || '#3B82F6' }}
                >
                  {post.planet.name}
                </span>
              </PlanetPopup>
            </>
          )}
          <span className="text-mid">&nbsp;&middot;&nbsp;{post.timeSince}</span>
        </div>

        <NavLink
          href={post.relativeUrl}
          className="text-base text-primary mt-0.5"
        >
          <Twemoji options={{ className: 'twemoji' }}>{post.title}</Twemoji>
        </NavLink>

        <PostText post={post} showFullText={showFullText} />

        <PostImages post={post} />

        <PostEmbed post={post} />

        <PostActions post={post} />
      </div>
    </article>
  )
}

export default React.memo(Post)
