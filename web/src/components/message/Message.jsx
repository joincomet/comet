import UserPopup from '@/components/user/UserPopup'
import UserAvatar from '@/components/user/UserAvatar'
import { calendarDate, shortTime } from '@/utils/timeUtils'
import { memo, useCallback } from 'react'
import { IconDownloadLarge, IconUserJoin } from '@/components/ui/icons/Icons'
import { useFileIcon } from '@/hooks/useFileIcon'
import { formatBytes } from '@/utils/formatBytes'
import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'
import MessageImageDialog from '@/components/message/MessageImageDialog'
import PostEmbed from '@/components/post/PostEmbed'
import { useCurrentUser } from '@/hooks/graphql/useCurrentUser'

export default memo(function Message({ index, message, prevMessage }) {
  const [currentUser] = useCurrentUser()
  const isMentioned =
    message.isEveryoneMentioned ||
    message.mentionedUsers.map(u => u.id).includes(currentUser.id)
  const FileIcon = useFileIcon(message?.file?.mime)

  const onClickMention = useCallback(
    e => {
      const mention = e.target?.dataset?.mention
      if (mention) {
        const id = mention.substring(2, mention.length - 1)
      }
    },
    [message]
  )

  const showUser =
    index === 0 ||
    (prevMessage &&
      (!prevMessage.text || prevMessage.author.id !== message.author.id))

  if (message.type === 'Join') {
    return (
      <ContextMenuTrigger
        className={prevMessage?.text ? 'pt-4' : ''}
        data={{ type: ContextMenuType.Message, message }}
      >
        <div className="flex dark:hover:bg-gray-775 py-1 px-4">
          <div className="w-10 flex justify-center">
            <IconUserJoin className="w-5 h-5 text-green-500" />
          </div>
          <div className="pl-4 text-base text-tertiary">
            <ContextMenuTrigger
              className="inline-block"
              data={{ type: ContextMenuType.User, user: message.author }}
            >
              <UserPopup
                user={message.author}
                roles={message.serverUser?.roles}
                nickname={message.serverUser?.nickname}
              >
                <span className="text-white cursor-pointer hover:underline">
                  {message.author.name}
                </span>
              </UserPopup>
            </ContextMenuTrigger>{' '}
            has joined the {message.serverUser ? 'planet' : 'group'}
            <span className="pl-2 text-11 whitespace-nowrap text-mid cursor-default leading-5 select-none">
              {shortTime(message.createdAt)}
            </span>
          </div>
        </div>
      </ContextMenuTrigger>
    )
  }

  return (
    <div className={`${showUser ? 'pt-4' : ''}`}>
      <ContextMenuTrigger data={{ type: ContextMenuType.Message, message }}>
        <div className={`flex py-1 px-4 dark:hover:bg-gray-775 group relative`}>
          {isMentioned && (
            <div className="bg-gray-500 group-hover:bg-opacity-30 bg-opacity-10 absolute inset-0 pointer-events-none border-l-2 border-gray-500" />
          )}

          {showUser ? (
            <ContextMenuTrigger
              data={{ type: ContextMenuType.User, user: message.author }}
            >
              <UserPopup
                user={message.author}
                roles={message.serverUser?.roles}
                nickname={message.serverUser?.nickname}
              >
                <UserAvatar
                  user={message.author}
                  size={10}
                  className="dark:bg-gray-700 cursor-pointer"
                />
              </UserPopup>
            </ContextMenuTrigger>
          ) : (
            <div className="w-10 text-11 whitespace-nowrap text-mid group-hover:opacity-100 opacity-0 cursor-default select-none leading-6.5">
              {shortTime(message.createdAt)}
            </div>
          )}

          <div className="pl-4 w-full">
            {showUser && (
              <div className="flex items-end pb-0.5">
                <ContextMenuTrigger
                  data={{ type: ContextMenuType.User, user: message.author }}
                >
                  <UserPopup
                    user={message.author}
                    roles={message.serverUser?.roles}
                    nickname={message.serverUser?.nickname}
                  >
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
                onClick={onClickMention}
                className="prose prose-sm dark:prose-dark focus:outline-none max-w-none"
                dangerouslySetInnerHTML={{ __html: message.text }}
              />
            )}

            {!!message.linkMetadatas?.length && (
              <>
                {message.linkMetadatas.map((lm, i) => (
                  <div key={i} className="py-1.5 max-w-screen-sm w-full">
                    <PostEmbed dark metadata={lm} linkUrl={lm.url} />
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
