import Image from 'next/image'
import { FiLink } from 'react-icons/fi'
import React from 'react'
import ReactPlayer from 'react-player/youtube'

export default function PostEmbed({ post, measure }) {
  if (!post.linkUrl) return null

  /*const isMounted = useMountedState()
  const { theme } = useTheme()

  const isTwitter = () =>
    post.linkUrl &&
    !!post.linkUrl.match(
      /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)(?:\/.*)?$/i
    )
  const tweetId = () =>
    isTwitter() ? post.linkUrl.split('/status/')[1].split('/')[0] : null*/

  /*if (isTwitter())
    return (
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
          theme
        }}
      />
    )*/

  if (ReactPlayer.canPlay(post.linkUrl))
    return (
      <div className="rounded-md overflow-hidden player-wrapper mt-3">
        <ReactPlayer
          onReady={measure}
          className="react-player"
          controls={true}
          url={post.linkUrl}
          width="100%"
          height="100%"
        />
      </div>
    )

  if (post.meta && post.meta.title)
    return (
      <a
        href={post.linkUrl}
        target="_blank"
        rel="noreferrer noopener nofollow"
        className="mt-3 group rounded-md flex items-start bg-gray-100 border border-gray-200 rounded-m dark:border-gray-800 dark:bg-gray-900 hover:bg-gray-200 shadow-inner"
      >
        <div className="w-32 h-32 relative flex-shrink-0">
          {post.thumbnailUrl || post.logoUrl ? (
            <Image
              src={post.thumbnailUrl || post.logoUrl}
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
          <div className="text-sm font-semibold transition line-clamp-2 text-primary group-hover:text-blue-500">
            {post.meta && post.meta.title ? post.meta.title : post.linkUrl}
          </div>

          <div className="mt-1 text-xs font-medium text-secondary line-clamp-2">
            {post.meta && post.meta.description ? post.meta.description : ''}
          </div>

          <div className="flex flex-row items-center mt-auto text-tertiary text-xs hover:underline">
            {post.logoUrl && (
              <div className="inline-block w-4 h-4 mr-3">
                <Image src={post.logoUrl} width={16} height={16} />
              </div>
            )}
            {post.domain}
          </div>
        </div>
      </a>
    )

  return (
    <a
      href={post.linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline cursor-pointer text-sm break-all"
    >
      {post.linkUrl}
    </a>
  )
}
