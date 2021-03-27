import React from 'react'
import FriendListItemBase from '@/pages/friends/FriendListItemBase'
import { IconUnblockUser } from '@/lib/Icons'
import FriendListItemButton from '@/pages/friends/FriendListItemButton'

export default function BlockedUserListItem({ user }) {
  return (
    <FriendListItemBase friend={user}>
      <FriendListItemButton label="user.unblock">
        <IconUnblockUser className="w-5 h-5" />
      </FriendListItemButton>
    </FriendListItemBase>
  )
}
