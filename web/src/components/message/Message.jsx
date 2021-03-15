import React from 'react'
import UserPopup from '@/components/user/UserPopup'
import UserAvatar from '@/components/user/UserAvatar'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'

dayjs.extend(calendar)

export default function Message({ showUser, message }) {
  return (
    <div
      key={message.id}
      className="flex py-1 px-4 dark:hover:bg-gray-775 group"
    >
      {showUser ? (
        <UserPopup user={message.author}>
          <UserAvatar
            user={message.author}
            className="w-10 h-10 dark:bg-gray-700 cursor-pointer"
          />
        </UserPopup>
      ) : (
        <div className="w-10 text-11 whitespace-nowrap text-mid group-hover:opacity-100 opacity-0 cursor-default leading-5 select-none">
          {dayjs(message.createdAt).format('h:mm A')}
        </div>
      )}

      <div className="pl-4">
        {showUser && (
          <div className="flex items-end pb-1">
            <UserPopup user={message.author}>
              <div className="text-sm font-medium cursor-pointer hover:underline leading-none">
                {message.author.username}
              </div>
            </UserPopup>
            <div className="text-11 text-mid pl-2 leading-none cursor-default select-none">
              {dayjs(message.createdAt).calendar()}
            </div>
          </div>
        )}

        <div className="text-sm text-secondary">{message.text}</div>
      </div>
    </div>
  )
}
