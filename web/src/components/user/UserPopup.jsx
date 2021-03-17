import React from 'react'
import Popup from '@/components/ui/Popup'
import UserAvatar from '@/components/user/UserAvatar'

export default function UserPopup({ user, children, placement = 'right' }) {
  return (
    <Popup
      className="w-64"
      placement={placement}
      render={
        <div className="w-full relative rounded-md shadow-lg dark:bg-gray-850 duration-200 transform transition p-3 flex flex-col items-center z-50 w-64">
          <UserAvatar
            user={user}
            size={20}
            showOnline
            className="dark:bg-gray-700 cursor-pointer select-none"
            dotClassName="ring-6 w-5 h-5 dark:ring-gray-850"
          />

          <div className="mt-3 text-base">
            <span className="font-semibold text-primary">{user.name}</span>
            <span className="text-tertiary">#{user.tag}</span>
          </div>
        </div>
      }
    >
      {children}
    </Popup>
  )
}
