import { IconLinkWeb } from '@/components/ui/icons/Icons'
import CustomEmbed, { canEmbed } from '@/components/ui/CustomEmbed'
import { useMemo } from 'react'

export default function PostEmbed({ linkUrl, metadata, dark = false }) {
  const domain = useMemo(() => {
    if (!linkUrl) return 'domain.com'
    let d = new URL(linkUrl).hostname
    if (d.startsWith('www.')) d = d.substring(4)
    return d
  }, [linkUrl])

  if (linkUrl && canEmbed(linkUrl)) return <CustomEmbed url={linkUrl} />
  return (
    <a
      href={linkUrl}
      rel="noopener nofollow noreferrer"
      target="_blank"
      className={`rounded-md flex transition ${
        dark
          ? 'dark:bg-gray-775 border dark:border-gray-825'
          : 'dark:bg-gray-750 dark:hover:bg-gray-725'
      }`}
    >
      <div
        className="rounded-l-md dark:bg-gray-750 flex flex-shrink-0 items-center justify-center h-24 w-24 bg-contain bg-center"
        style={
          metadata?.image ? { backgroundImage: `url(${metadata?.image})` } : {}
        }
      >
        {!metadata?.image && <IconLinkWeb className="w-1/2 h-1/2 text-mid" />}
      </div>
      <div className="flex-grow rounded-r-md pl-4 pr-4 max-h-24 flex flex-col py-1.5">
        <div className="text-base text-primary line-clamp-1">
          {metadata?.title ?? 'No title'}
        </div>
        <div
          className="text-13 text-secondary pt-0.5 line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: metadata?.description ?? 'No description'
          }}
        />
        <div className="mt-auto text-11 text-tertiary flex items-center">
          {(!metadata || metadata?.logo) && (
            <div
              className="h-4 w-4 mr-2 dark:bg-gray-725 bg-contain bg-center"
              style={
                metadata?.logo
                  ? { backgroundImage: `url(${metadata?.logo})` }
                  : {}
              }
            />
          )}

          {domain}
        </div>
      </div>
    </a>
  )
}
