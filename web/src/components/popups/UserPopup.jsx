import React from 'react'
import Popup from '@/components/ui/Popup'
import { Link } from 'react-router-dom'
import UserAvatar from '@/components/avatars/UserAvatar'

export default function UserPopup({ user, children, placement = 'right' }) {
  return (
    <Popup
      className="w-64"
      placement={placement}
      render={
        <div className="w-full relative rounded-md shadow-lg dark:bg-gray-850 dark:hover:bg-gray-900 duration-200 transform transition hover:shadow-xl p-3 flex flex-col items-center z-50 w-64">
          <Link className="w-20 h-20" to={`/user/${user.username}`}>
            <UserAvatar user={user} className="w-20 h-20" />
          </Link>

          <div className="mt-3 text-base text-primary font-medium">
            {user.username}
          </div>

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
