import { useState } from 'react'
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
import FriendRequestListItem from '@/pages/friends/FriendRequestListItem'

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

  const [username, setUsername] = useState('')

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
              {friendRequests.map(fr => (
                <FriendRequestListItem
                  request={fr}
                  key={`${fr.isOutgoing ? 'outgoing' : 'incoming'}-${
                    fr.user.id
                  }`}
                />
              ))}
            </>
          )}
          {friendsPage === 'Blocked' && (
            <>
              <div className={label}>Blocked Users - {blockedUsers.length}</div>
            </>
          )}

          {friendsPage === 'Add Friend' && (
            <div>
              <div className="font-bold uppercase text-base text-primary">
                Add Friend
              </div>

              <div className="text-secondary text-sm mt-3 mb-4">
                You can add a friend with their Comet Tag. It's cAsE sEnSitIvE!
              </div>

              <div className="relative">
                <input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter a Username#0000"
                  className="w-full h-14 rounded-xl px-4 dark:bg-gray-775 border dark:border-gray-850 placeholder-gray-400 dark:placeholder-gray-600 block focus:outline-none text-base text-secondary"
                />

                <button
                  className="absolute right-4 text-13 text-primary font-medium bg-blue-500 rounded h-8 px-4 top-1/2 transform -translate-y-1/2 disabled:opacity-50"
                  disabled={!username}
                >
                  Send Friend Request
                </button>
              </div>
            </div>
          )}
        </View>
      </Container>
    </>
  )
}
