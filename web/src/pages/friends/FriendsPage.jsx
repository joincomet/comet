import { useState } from 'react'
import { useStore } from '@/hooks/useStore'
import FriendListItem from '@/pages/friends/FriendListItem'
import FriendsHeader from '@/pages/friends/FriendsHeader'
import ctl from '@netlify/classnames-template-literals'
import FriendRequestListItem from '@/pages/friends/FriendRequestListItem'
import { useSetHomePage } from '@/hooks/useSetHomePage'
import Page from '@/components/ui/page/Page'
import PageView from '@/components/ui/page/PageView'
import { useUserRelationships } from '@/hooks/useUserRelationships'
import { RelationshipStatus } from '@/graphql/hooks'
import { Helmet } from 'react-helmet-async'

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
  const { friends, outgoingFriendRequests, incomingFriendRequests, blocking } =
    useUserRelationships()
  const onlineFriends = friends.filter(f => f.isOnline)
  const friendRequests = outgoingFriendRequests.concat(incomingFriendRequests)
  const friendsPage = useStore(s => s.friendsPage)

  const [username, setUsername] = useState('')
  useSetHomePage(`friends`)
  return (
    <Page
      header={<FriendsHeader pendingCount={incomingFriendRequests.length} />}
    >
      <Helmet>
        <title>Friends – Comet</title>
      </Helmet>

      <PageView>
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
            {friendRequests.map(user => (
              <FriendRequestListItem
                user={user}
                key={`${
                  user.relationshipStatus ===
                  RelationshipStatus.FriendRequestOutgoing
                    ? 'outgoing'
                    : 'incoming'
                }-${user.id}`}
              />
            ))}
          </>
        )}
        {friendsPage === 'Blocked' && (
          <>
            <div className={label}>Blocked Users - {blocking.length}</div>
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
      </PageView>
    </Page>
  )
}
