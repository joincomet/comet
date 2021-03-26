import React from 'react'
import {
  useBlockedUsers,
  useFriendRequests,
  useFriends
} from '@/components/providers/DataProvider'
import { useStore } from '@/lib/stores/useStore'
import FriendListItem from '@/pages/friends/FriendListItem'
import FriendsHeader from '@/components/headers/FriendsHeader'
import Container from '@/components/Container'
import View from '@/components/View'
import ctl from '@netlify/classnames-template-literals'

const label = ctl(`
  px-2
  pb-2
  text-11
  text-tertiary
  uppercase
  tracking-wide
  font-semibold
  select-none
`)

export default function FriendsPage() {
  const friends = useFriends()
  const onlineFriends = friends.filter(f => f.isOnline)
  const friendRequests = useFriendRequests()
  const blockedUsers = useBlockedUsers()
  const { friendsPage } = useStore()
  return (
    <>
      <FriendsHeader
        pendingCount={friendRequests.filter(r => !r.isOutgoing).length}
      />

      <Container>
        <View className="px-6 py-4">
          {friendsPage === 'Online' && (
            <>
              <div className={label}>Online - {onlineFriends.length}</div>
              {onlineFriends.map(friend => (
                <FriendListItem friend={friend} key={friend.id} />
              ))}
            </>
          )}
          {friendsPage === 'All' && (
            <>
              <div className={label}>All Friends - {friends.length}</div>
              {friends.map(friend => (
                <FriendListItem friend={friend} key={friend.id} />
              ))}
            </>
          )}
          {friendsPage === 'Pending' && (
            <>
              <div className={label}>
                Pending Requests - {friendRequests.length}
              </div>
            </>
          )}
          {friendsPage === 'Blocked' && (
            <>
              <div className={label}>Blocked Users - {blockedUsers.length}</div>
            </>
          )}
        </View>
      </Container>
    </>
  )
}
