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

function Post({
  post,
  showPlanet = true,
  showFullText = false,
  className = ''
}) {
  const router = useRouter()
  return (
    <article
      onClick={() => router.push(post.relativeUrl)}
      className={`${className} cursor-pointer bg-white dark:bg-gray-900 relative rounded w-full mb-0.5`}
    >
      {post.pinned && (
        <TiPinOutline
          size={20}
          className="absolute top-3 right-3 text-accent"
        />
      )}
      <div className="flex items-start pl-3 pr-16 pt-3">
        <UserPopup user={post.author}>
          <UserAvatar
            user={post.author}
            className="cursor-pointer w-10 h-10 mr-3"
            loading="eager"
          />
        </UserPopup>

        <div className="flex flex-col">
          <div className="inline-flex items-center text-sm">
            {post.author ? (
              <>
                <UserPopup user={post.author}>
                  <div className="inline-flex items-center">
                    <div className="text-secondary font-medium hover:underline cursor-pointer">
                      {post.author.name}
                    </div>
                  </div>
                </UserPopup>
                &nbsp;
                <UserPopup user={post.author}>
                  <div className="inline-flex items-center">
                    <div className="text-tertiary cursor-pointer">
                      @{post.author.username}
                    </div>
                  </div>
                </UserPopup>
              </>
            ) : (
              <div className="inline-block">
                <div className="text-secondary font-semibold hover:underline cursor-pointer">
                  [deleted]
                </div>
                &nbsp;
                <div className="text-tertiary hidden sm:block">@[deleted]</div>
              </div>
            )}

            {showPlanet && (
              <>
                &nbsp;
                <CgArrowRight size={16} className="text-tertiary" />
                &nbsp;
                <PlanetPopup planet={post.planet}>
                  <div
                    className={`font-medium hover:underline cursor-pointer`}
                    style={{ color: post.planet.color || '#3B82F6' }}
                  >
                    {post.planet.name}
                  </div>
                </PlanetPopup>
              </>
            )}
            <span className="text-tertiary hidden sm:block">
              &nbsp;&middot;&nbsp;{post.timeSince}
            </span>
          </div>

          <NavLink href={post.relativeUrl} className="title text-primary">
            {post.title}
          </NavLink>
        </div>
      </div>

      <div className="mx-3 sm:mx-16">
        <PostText post={post} showFullText={showFullText} />

        <PostImages post={post} />

        <PostEmbed post={post} />
      </div>

      <PostActions post={post} />
    </article>
  )
}

export default React.memo(Post)
