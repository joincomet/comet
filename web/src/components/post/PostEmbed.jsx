import { IconLinkWeb } from '@/components/ui/icons/Icons'
import ReactPlayer from 'react-player'

export default function PostEmbed({ linkUrl, metadata }) {
  if (linkUrl && ReactPlayer.canPlay(linkUrl))
    return (
      <div className="relative aspect-h-9 aspect-w-16">
        <ReactPlayer
          url={linkUrl}
          width="100%"
          height="100%"
          className="absolute top-0 left-0"
        />
      </div>
    )
  return (
    <div className="rounded-md flex">
      <div
        className="rounded-l-md dark:bg-gray-750 flex flex-shrink-0 items-center justify-center h-24 w-24"
        style={
          metadata?.image ? { backgroundImage: `url(${metadata?.image})` } : {}
        }
      >
        {!metadata?.image && <IconLinkWeb className="w-1/2 h-1/2 text-mid" />}
      </div>
      <div className="dark:bg-gray-775 flex-grow rounded-r-md pl-4 flex flex-col py-2">
        <div className="text-base text-primary">
          {metadata?.title ?? 'Title'}
        </div>
        <div className="text-13 text-secondary pt-1">
          {metadata?.description ?? 'Description'}
        </div>
        <div className="mt-auto text-11 text-tertiary flex items-center">
          {(!metadata || metadata?.logo) && (
            <div
              className="h-4 w-4 mr-2 dark:bg-gray-725"
              style={
                metadata?.logo
                  ? { backgroundImage: `url(${metadata?.logo})` }
                  : {}
              }
            />
          )}

          {metadata?.domain ?? 'domain.com'}
        </div>
      </div>
    </div>
  )
}
