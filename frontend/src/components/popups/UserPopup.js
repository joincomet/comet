import React from 'react'
import Popup from '@/components/ui/Popup'
import NavLink from '@/components/ui/NavLink'
import UserAvatar from '@/components/avatars/UserAvatar'

export default function UserPopup({ user, children }) {
  return (
    <Popup
      className="w-64"
      render={
        <div className="w-full relative border border-gray-200 dark:border-transparent bg-white dark:bg-gray-800 rounded-md shadow-lg p-3 flex flex-col items-center z-50 w-64">
          <NavLink className="w-20 h-20" href={`/user/${user.username}`}>
            <UserAvatar user={user} className="w-20 h-20" />
          </NavLink>

          <NavLink
            href={`/user/${user.username}`}
            className="mt-3 text-primary font-medium"
          >
            {user.username}
          </NavLink>

          <div className="mt-3 text-sm text-secondary font-medium text-center line-clamp-3 whitespace-normal">
            {user.bio || 'New CometX User'}
          </div>
        </div>
      }
    >
      {children}
    </Popup>
  )
}
