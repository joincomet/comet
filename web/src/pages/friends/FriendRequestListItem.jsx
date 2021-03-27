import React from 'react'
import FriendListItemBase from '@/pages/friends/FriendListItemBase'
import { IconX, IconCheck } from '@/lib/Icons'
import FriendListItemButton from '@/pages/friends/FriendListItemButton'

export default function FriendRequestListItem({ request }) {
  return (
    <FriendListItemBase friend={request.user}>
      {request.isOutgoing ? (
        <FriendListItemButton label="friends.revokeRequest">
          <IconX className="w-5 h-5" />
        </FriendListItemButton>
      ) : (
        <>
          <FriendListItemButton label="friends.acceptRequest">
            <IconCheck className="w-5 h-5" />
          </FriendListItemButton>
          <FriendListItemButton label="friends.rejectRequest">
            <IconX className="w-5 h-5" />
          </FriendListItemButton>
        </>
      )}
    </FriendListItemBase>
  )
}
