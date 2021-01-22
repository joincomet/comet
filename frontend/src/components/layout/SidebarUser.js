import { FiUser } from 'react-icons/fi'
import React from 'react'

export default function SidebarUser({ user }) {
  return (
    <div className="sidebar-item sidebar-item--large">
      <div className="relative w-8 h-8 dark:bg-gray-800 rounded-full inline-flex items-center justify-center">
        {user.avatarUrl ? (
          <img
            alt={user.username}
            src={user.avatarUrl}
            className="rounded-full object-cover w-full h-full"
          />
        ) : (
          <div>
            <FiUser className="w-5 h-5 text-tertiary" />
          </div>
        )}
      </div>

      <div className="ml-3 font-medium text-tertiary">{user.username}</div>
    </div>
  )
}
