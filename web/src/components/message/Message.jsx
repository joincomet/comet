import UserPopup from '@/components/user/UserPopup'
import UserAvatar from '@/components/user/UserAvatar'
import { calendarDate, shortTime } from '@/utils/timeUtils'
import { memo } from 'react'
import { IconDownloadLarge, IconUserJoin } from '@/components/ui/icons/Icons'
import { useFileIcon } from '@/hooks/useFileIcon'
import { formatBytes } from '@/utils/formatBytes'
import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'
import MessageImageDialog from '@/components/message/MessageImageDialog'
import ctl from '@netlify/classnames-template-literals'
import PostEmbed from '@/components/post/PostEmbed'

const joinMsg = ctl(`
  text-base
  text-secondary
`)

export default memo(function Message({ showUser, message }) {
  const FileIcon = useFileIcon(message?.file?.mime)

  if (message.type === 'Join') {
    return (
      <div className="flex dark:hover:bg-gray-775 py-1 px-4">
        <div className="w-10 flex justify-center">
          <IconUserJoin className="w-5 h-5 text-green-500" />
        </div>
        <div className="pl-4 text-base text-tertiary ">
          <span className="text-white cursor-pointer hover:underline">
            {message.author.name}
          </span>{' '}
          has joined the {message.serverUser ? 'server' : 'group'}
          <span className="pl-2 text-11 whitespace-nowrap text-mid cursor-default leading-5 select-none">
            {shortTime(message.createdAt)}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={`${showUser ? 'pt-4' : ''}`}>
      <ContextMenuTrigger data={{ type: ContextMenuType.Message, message }}>
        <div className={`flex py-1 px-4 dark:hover:bg-gray-775 group`}>
          {showUser ? (
            <ContextMenuTrigger
              data={{ type: ContextMenuType.User, user: message.author }}
            >
              <UserPopup user={message.author}>
                <UserAvatar
                  user={message.author}
                  size={10}
                  className="dark:bg-gray-700 cursor-pointer"
                />
              </UserPopup>
            </ContextMenuTrigger>
          ) : (
            <div className="w-10 text-11 whitespace-nowrap text-mid group-hover:opacity-100 opacity-0 cursor-default leading-5 select-none">
              {shortTime(message.createdAt)}
            </div>
          )}

          <div className="pl-4 w-full">
            {showUser && (
              <div className="flex items-end pb-1.5">
                <ContextMenuTrigger
                  data={{ type: ContextMenuType.User, user: message.author }}
                >
                  <UserPopup user={message.author}>
                    <div className="text-base font-medium cursor-pointer hover:underline leading-none">
                      {message.author.name}
                    </div>
                  </UserPopup>
                </ContextMenuTrigger>

                <div className="text-11 text-mid pl-2 leading-none cursor-default select-none">
                  {calendarDate(message.createdAt)}
                </div>
              </div>
            )}

            {!!message.text && (
              <div
                className="prose prose-sm dark:prose-dark focus:outline-none max-w-none"
                dangerouslySetInnerHTML={{ __html: message.text }}
              />
            )}

            {!!message.linkMetadatas?.length && (
              <>
                {message.linkMetadatas.map((lm, i) => (
                  <div key={i} className="pt-1.5 max-w-screen-sm w-full">
                    <PostEmbed metadata={lm} linkUrl={lm.url} />
                  </div>
                ))}
              </>
            )}

            <MessageImageDialog message={message} />

            {!!message.file && (
              <div className="pt-1 max-w-screen-sm w-full">
                <div className="flex border dark:border-gray-850 dark:bg-gray-800 p-3 rounded w-full items-center">
                  <FileIcon className="w-8 h-8 dark:text-white" />
                  <div className="pl-3">
                    <a
                      href={message.file.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="block text-base text-accent hover:underline cursor-pointer truncate"
                    >
                      {message.file.filename}
                    </a>
                    <div className="text-mid text-xs">
                      {formatBytes(message.file.size)}
                    </div>
                  </div>
                  <a
                    className="block ml-auto"
                    href={message.file.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <IconDownloadLarge className="h-6 w-6 highlightable" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </ContextMenuTrigger>
    </div>
  )
})
