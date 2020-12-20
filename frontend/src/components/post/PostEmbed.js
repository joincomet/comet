import Image from 'next/image'
import { FiLink } from 'react-icons/fi'
import React from 'react'
import ReactPlayer from 'react-player/youtube'

export default function PostEmbed({ post }) {
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
      <div className="mt-2 rounded overflow-hidden relative aspect-w-16 aspect-h-9">
        <ReactPlayer
          className="absolute top-0 left-0"
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
        className="mt-2 block rounded border dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800 transition"
      >
        {post.meta.twitterCard === 'summary_large_image' && post.thumbnailUrl && (
          <div className="w-full aspect-w-16 aspect-h-9 relative rounded-t">
            <Image
              src={post.thumbnailUrl}
              loading="eager"
              layout="fill"
              objectFit="cover"
              className="rounded-t"
            />
          </div>
        )}

        <div className="flex items-start">
          {post.meta.twitterCard !== 'summary_large_image' && (
            <div className="w-32 h-32 relative flex-shrink-0 rounded-l-xl">
              {post.thumbnailUrl || post.logoUrl ? (
                <Image
                  src={post.thumbnailUrl || post.logoUrl}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-l"
                  loading="eager"
                />
              ) : (
                <div className="flex w-32 h-32 rounded-l">
                  <FiLink className="w-8 h-8 m-auto text-tertiary" />
                </div>
              )}
            </div>
          )}

          <div
            className={`flex flex-col px-3 py-2 cursor-pointer ${
              post.meta.twitterCard !== 'summary_large_image' ? 'h-32' : ''
            }`}
          >
            <div className="font-medium line-clamp-2 text-secondary text-sm">
              {post.meta && post.meta.title ? post.meta.title : post.linkUrl}
            </div>

            <div className="text-xs font-medium text-tertiary line-clamp-2 mt-1">
              {post.meta && post.meta.description ? post.meta.description : ''}
            </div>

            <div className="mt-auto flex flex-row items-center pt-3 text-tertiary text-xs">
              {post.logoUrl && (
                <div className="inline-block w-4 h-4 mr-3">
                  <Image
                    loading="eager"
                    src={post.logoUrl}
                    width={16}
                    height={16}
                  />
                </div>
              )}
              {post.domain}
            </div>
          </div>
        </div>
      </a>
    )

  return (
    <a
      href={post.linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 border dark:border-gray-800 rounded mt-2 text-blue-500 hover:underline cursor-pointer text-sm break-all"
    >
      {post.linkUrl}
    </a>
  )
}
