import FriendListItemBase from '@/pages/me/friends/FriendListItemBase'
import { IconCheck, IconX } from '@/components/ui/icons/Icons'
import FriendListItemButton from '@/pages/me/friends/FriendListItemButton'
import { RelationshipStatus } from '@/graphql/hooks'

export default function FriendRequestListItem({ user }) {
  return (
    <FriendListItemBase friend={user}>
      {user.relationshipStatus === RelationshipStatus.FriendRequestOutgoing ? (
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
