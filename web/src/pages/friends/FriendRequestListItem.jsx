import FriendListItemBase from '@/pages/friends/FriendListItemBase'
import { IconCheck, IconX } from '@/components/ui/icons/Icons'
import FriendListItemButton from '@/pages/friends/FriendListItemButton'
import {
  RelationshipStatus,
  useAnswerFriendRequestMutation,
  useDeleteFriendRequestMutation
} from '@/graphql/hooks'
import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'

export default function FriendRequestListItem({ user }) {
  const [deleteFriendRequest] = useDeleteFriendRequestMutation()
  const [answerFriendRequest] = useAnswerFriendRequestMutation()
  return (
    <ContextMenuTrigger data={{ type: ContextMenuType.User, user }}>
      <FriendListItemBase friend={user}>
        {user.relationshipStatus ===
        RelationshipStatus.FriendRequestOutgoing ? (
          <FriendListItemButton
            label="Cancel"
            onClick={e => {
              e.stopPropagation()
              deleteFriendRequest({ variables: { input: { userId: user.id } } })
            }}
          >
            <IconX className="w-5 h-5" />
          </FriendListItemButton>
        ) : (
          <>
            <FriendListItemButton
              label="Accept"
              onClick={e => {
                e.stopPropagation()
                answerFriendRequest({
                  variables: { input: { userId: user.id, accept: true } }
                })
              }}
            >
              <IconCheck className="w-5 h-5" />
            </FriendListItemButton>
            <FriendListItemButton
              label="Ignore"
              onClick={e => {
                e.stopPropagation()
                answerFriendRequest({
                  variables: { input: { userId: user.id, accept: false } }
                })
              }}
            >
              <IconX className="w-5 h-5" />
            </FriendListItemButton>
          </>
        )}
      </FriendListItemBase>
    </ContextMenuTrigger>
  )
}
