import { FiUser } from 'react-icons/fi'
import React from 'react'
import UserPopup from '@/components/user/UserPopup'
import UserAvatar from '@/components/user/UserAvatar'

export default function SidebarUser({ user }) {
  return (
    <UserPopup user={user} placement="left">
      <div className="sidebar-item sidebar-item--large">
        <UserAvatar className="w-8 h-8" user={user} />
        <div className="ml-3 font-medium text-tertiary">{user.username}</div>
      </div>
    </UserPopup>
  )
}
