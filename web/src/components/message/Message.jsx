import UserPopup from '@/components/user/UserPopup'
import UserAvatar from '@/components/user/UserAvatar'
import { calendarDate, shortTime } from '@/utils/timeUtils'
import { memo } from 'react'

export default memo(function Message({ showUser, message }) {
  return (
    <div className={`${showUser ? 'pt-4' : ''}`}>
      <div className={`flex py-1 px-4 dark:hover:bg-gray-775 group`}>
        {showUser ? (
          <UserPopup user={message.author}>
            <UserAvatar
              user={message.author}
              size={10}
              className="dark:bg-gray-700 cursor-pointer"
            />
          </UserPopup>
        ) : (
          <div className="w-10 text-11 whitespace-nowrap text-mid group-hover:opacity-100 opacity-0 cursor-default leading-5 select-none">
            {shortTime(message.createdAt)}
          </div>
        )}

        <div className="pl-4">
          {showUser && (
            <div className="flex items-end pb-1.5">
              <UserPopup user={message.author}>
                <div className="text-sm font-medium cursor-pointer hover:underline leading-none">
                  {message.author.name}
                </div>
              </UserPopup>
              <div className="text-11 text-mid pl-2 leading-none cursor-default select-none">
                {calendarDate(message.createdAt)}
              </div>
            </div>
          )}

          <div
            className="text-base text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: message.text }}
          />
        </div>
      </div>
    </div>
  )
})
