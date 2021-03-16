import React from 'react'
import Popup from '@/components/ui/Popup'
import UserAvatar from '@/components/user/UserAvatar'

export default function UserPopup({ user, children, placement = 'right' }) {
  return (
    <Popup
      className="w-64"
      placement={placement}
      render={
        <div className="w-full relative rounded-md shadow-lg dark:bg-gray-850 dark:hover:bg-gray-900 duration-200 transform transition hover:shadow-xl p-3 flex flex-col items-center z-50 w-64">
          <UserAvatar user={user} className="w-20 h-20 dark:bg-gray-750" />

          <div className="mt-3 text-base text-primary font-medium">
            {user.name}
          </div>
        </div>
      }
    >
      {children}
    </Popup>
  )
}
