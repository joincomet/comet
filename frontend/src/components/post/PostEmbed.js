import { Tweet } from 'react-twitter-widgets'
import Image from 'next/image'
import { FiLink } from 'react-icons/fi'
import React from 'react'
import { useMountedState } from 'react-use'
import { useTheme } from '@/components/ThemeContext'
import ReactPlayer from 'react-player/youtube'

export default function PostEmbed({ post, measure }) {
  if (!post.linkURL) return null

  const isMounted = useMountedState()
  const { theme } = useTheme()

  const isTwitter = () =>
    post.linkURL &&
    !!post.linkURL.match(
      /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)(?:\/.*)?$/i
    )
  const tweetId = () =>
    isTwitter() ? post.linkURL.split('/status/')[1].split('/')[0] : null

  const isCustomEmbed = () =>
    post.linkURL && (isTwitter() || ReactPlayer.canPlay(post.linkURL))

  if (isTwitter())
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
    )

  if (ReactPlayer.canPlay(post.linkURL))
    return (
      <div className="rounded-md overflow-hidden">
        <ReactPlayer controls={true} url={post.linkURL} />
      </div>
    )

  if (post.meta && post.meta.title)
    return (
      <a
        href={post.linkURL}
        target="_blank"
        rel="noreferrer noopener nofollow"
        className="group rounded-md flex items-start bg-gray-100 border border-gray-200 rounded-m dark:border-gray-800 dark:bg-gray-900 hover:bg-gray-200"
      >
        <div className="w-32 h-32 relative flex-shrink-0">
          {post.thumbnailURL || post.logoURL ? (
            <Image
              loading="eager"
              src={post.thumbnailURL || post.logoURL}
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
            {post.meta && post.meta.title ? post.meta.title : post.linkURL}
          </div>

          <div className="mt-1 text-xs font-medium text-secondary line-clamp-2">
            {post.meta && post.meta.description ? post.meta.description : ''}
          </div>

          <div className="flex flex-row items-center mt-auto text-tertiary text-xs hover:underline">
            {post.logoURL && (
              <div className="inline-block w-4 h-4 mr-3">
                <Image
                  loading="eager"
                  src={post.logoURL}
                  width={16}
                  height={16}
                />
              </div>
            )}
            {post.domain}
          </div>
        </div>
      </a>
    )

  return (
    <a
      href={post.linkURL}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 hover:underline cursor-pointer mt-3 text-sm break-all"
    >
      {post.linkURL}
    </a>
  )
}
