import React from 'react'
import UserPopup from '@/components/popups/UserPopup'
import UserAvatar from '@/components/avatars/UserAvatar'
import SidebarItem from '@/components/sidebars/base/SidebarItem'

export default function SidebarUser({ user }) {
  return (
    <UserPopup user={user} placement="left">
      <SidebarItem>
        <UserAvatar className="w-8 h-8" user={user} />
        <div className="ml-3 font-medium text-tertiary">{user.username}</div>
      </SidebarItem>
    </UserPopup>
  )
}
