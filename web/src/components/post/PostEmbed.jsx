import { IconLinkExternal, IconPlay } from '@/components/ui/icons/Icons'
import CustomEmbed, { canEmbed } from '@/components/ui/CustomEmbed'
import { useState } from 'react'

export default function PostEmbed({ metadata, dark = false }) {
  const [playing, setPlaying] = useState(false)
  const embeddable = canEmbed(metadata.url)
  return (
    <div
      className={`rounded flex transition ${
        dark
          ? 'dark:bg-gray-850 dark:border-gray-950'
          : 'dark:bg-gray-800 dark:border-gray-900'
      } pt-4 border-l-4`}
    >
      <div className="overflow-auto flex-grow rounded-r-md pl-4 pr-4 pb-4 flex flex-col space-y-3">
        {metadata.publisher && (
          <div className="text-xs text-secondary">{metadata.publisher}</div>
        )}
        <div className="leading-none">
          <a
            href={metadata.url}
            rel="noopener nofollow noreferrer"
            target="_blank"
            className="text-sm font-semibold text-blue-400 hover:underline"
          >
            {metadata.title ?? 'No title'}
          </a>
        </div>

        {metadata.description && !embeddable && (
          <div className="">
            <div
              className="text-13 text-secondary line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: metadata.description ?? 'No description'
              }}
            />
          </div>
        )}

        {(embeddable ||
          (metadata.image &&
            metadata.twitterCard === 'summary_large_image')) && (
          <div className="max-w-[25rem] w-full h-full pt-1">
            {playing ? (
              <CustomEmbed url={metadata.url} />
            ) : (
              <div
                onClick={() => {
                  if (embeddable) {
                    setPlaying(true)
                  }
                }}
                className="relative cursor-pointer bg-cover bg-center bg-no-repeat aspect-h-9 aspect-w-16 h-full w-full rounded"
                style={{ backgroundImage: `url(${metadata.image})` }}
              >
                {!!embeddable && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-tertiary rounded-full bg-black bg-opacity-75 flex space-x-3 p-3">
                      <IconPlay className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition" />
                      <IconLinkExternal
                        onClick={e => {
                          e.stopPropagation()
                          e.preventDefault()
                          window.open(metadata.url, '_blank')
                        }}
                        className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {!!metadata.image &&
        metadata.twitterCard !== 'summary_large_image' &&
        !embeddable && (
          <div className="pb-4 px-4">
            <img
              alt="Thumbnail"
              src={metadata.image}
              className="object-cover w-20 min-w-[5rem] rounded max-h-[5rem] cursor-pointer h-auto cursor-pointer"
            />
          </div>
        )}
    </div>
  )
}
