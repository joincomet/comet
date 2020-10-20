import React from 'react'
import { NavLink } from './NavLink'
import { FiFolderPlus, FiMessageSquare, FiShare } from 'react-icons/fi'
import styles from './Post.module.scss'

function getStyle(provided, style) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  };
}

function Post({ post, isDragging, provided, isClone, isGroupedOver, style, index }) {
  return (
    <article className="pb-5" style={getStyle(provided, style)}       
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    data-is-dragging={isDragging}
    data-testid={post.id}
    data-index={index}
>
      <div className={styles.post}>
        <div className={styles.post__top}>
          <NavLink href={`/@${post.author.username}`}>
            <img
              alt={post.author.username}
              src={post.author.profile.avatarURL}
              className="object-cover object-center w-8 h-8 bg-gray-200 rounded-full"
            />
          </NavLink>
          <div className="flex flex-col flex-grow pr-12 ml-4">
            <div className="text-xs">
              <NavLink
                href={`/@${post.author.username}`}
                className="font-semibold text-tertiary hover:underline"
              >
                {post.author.username}
              </NavLink>
              <span className="text-tertiary">in</span>
              <NavLink
                href={`/+${post.planet.name}`}
                className="font-semibold text-accent hover:underline"
              >
                +{post.planet.name}
              </NavLink>
            </div>
            <div className="text-xs mt-0.5">
              <span className="text-tertiary">{post.timeSince} &middot; </span>
              <NavLink
                href={post.relativeURL}
                className="text-tertiary hover:underline"
              >
                {post.commentCount} comment{post.commentCount === 1 ? '' : 's'}
              </NavLink>
            </div>
          </div>
        </div>
        <div className={styles.post__content}>
          <div className="text-base font-semibold text-primary">
            {post.title}
          </div>
          {post.textContent && (
            <div
              className="mt-1 text-sm text-primary line-clamp-3"
              v-html="post.textContent"
            />
          )}

          {post.imageURLs && post.imageURLs.length > 0 ? (
            <img
              alt={post.title}
              src={post.imageURLs[0]}
              className="object-contain object-center w-full h-32 max-w-full mt-4 transition duration-100 ease-in-out bg-gray-100 border border-gray-200 hover:bg-gray-200 rounded-2xl"
            />
          ) : (
            post.embed &&
            post.embed.links &&
            post.embed.links.thumbnail &&
            post.embed.links.thumbnail.length > 0 && (
              <a
                href={post.linkURL}
                target="_blank"
                rel="noreferrer noopener nofollow"
                className="flex flex-row items-start mt-4 transition duration-100 ease-in-out bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200"
              >
                <img
                  src={post.embed.links.thumbnail[0].href}
                  className="object-cover object-center w-32 h-32 bg-white rounded-l-lg"
                />
                <div className="flex flex-col h-32 px-6 py-3 cursor-pointer">
                  <div className="text-sm font-semibold text-secondary line-clamp-2">
                    {post.embed.meta.title}
                  </div>

                  <div className="mt-1 text-xs font-medium text-tertiary line-clamp-2">
                    {post.embed.meta.description}
                  </div>

                  <div className="flex flex-row items-start mt-auto">
                    <img
                      v-if="post.embed.links.icon && post.embed.links.icon.length > 0"
                      src={post.embed.links.icon[0].href}
                      className="object-contain w-4 h-4 mr-3 rounded-sm"
                    />
                    <div className="text-xs font-semibold text-tertiary">
                      {post.domain}
                    </div>
                  </div>
                </div>
              </a>
            )
          )}
        </div>
        <div className={styles.post__bottom}>
          <div className={styles.post__chip}>
            <svg
              className="w-4 h-4"
              fill="currentColor"
              version="1.1"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m17.415 15.791s0-4.0376 0.0014-5.4164c0-4.3317-5.4164-7.5816-5.4164-7.5816s-5.4164 3.2499-5.4157 7.5823c0 3.2385 0.036062 5.4327 0.036062 5.4327s-3.2859 2.1489-3.2859 5.3988h17.331c0-3.2499-3.2506-5.4157-3.2506-5.4157zm-7.4154-5.2913c-9.404e-4 -1.1048 0.89494-2.0007 1.9997-1.9997 1.7821-2.829e-4 2.6744 2.1542 1.4144 3.4141-1.26 1.26-3.4144 0.36762-3.4141-1.4144z" />
            </svg>
            <span className="ml-2 text-xs font-semibold">
              {post.rocketCount}
            </span>
          </div>

          <div className={`ml-4 ${styles.post__chip}`}>
            <FiMessageSquare className="w-4 h-4" />
            <span className="ml-2 text-xs font-semibold">
              {post.commentCount}
            </span>
          </div>

          <div className="inline-flex flex-row items-center px-3 py-1 ml-auto transition duration-150 ease-in-out rounded-full text-tertiary hover:bg-gray-200">
            <FiShare className="w-4 h-4 text-green-500" />
          </div>

          <div className="inline-flex flex-row items-center px-3 py-1 ml-4 transition duration-150 ease-in-out rounded-full text-tertiary hover:bg-gray-200">
            <FiFolderPlus className="w-4 h-4" />
          </div>
        </div>
      </div>
    </article>
  )
}

export default React.memo(Post)
