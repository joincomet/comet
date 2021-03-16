import React from 'react'
import Header from '@/components/ui/header/Header'
import {
  useBlockedUsers,
  useFriendRequests,
  useFriends
} from '@/components/DataProvider'
import UserAvatar from '@/components/user/UserAvatar'
import { Link } from 'react-router-dom'
import { HiChatAlt2, HiDotsVertical, HiUserGroup } from 'react-icons/hi'
import Tippy from '@tippyjs/react'
import { useStore } from '@/lib/stores/useStore'
import FriendListItem from '@/components/FriendListItem'

function FriendTab({ page, green = false }) {
  const { friendsPage, setFriendsPage } = useStore()
  return (
    <button
      onClick={() => setFriendsPage(page)}
      className={`text-base rounded px-1.5 py-0.5 cursor-pointer select-none focus:outline-none ${
        page === friendsPage
          ? !green
            ? 'text-secondary dark:bg-gray-700'
            : 'text-green-600 bg-green-900'
          : !green
          ? 'text-tertiary'
          : 'text-secondary bg-green-600'
      }`}
    >
      {page}
    </button>
  )
}

const label =
  'px-2 pb-2 text-11 text-tertiary uppercase tracking-widest font-semibold'

export default function FriendsPage() {
  const friends = useFriends()
  const onlineFriends = friends.filter(f => f.isOnline)
  const friendRequests = useFriendRequests()
  const blockedUsers = useBlockedUsers()
  const { friendsPage } = useStore()
  return (
    <>
      <Header>
        <div className="flex items-center font-medium text-base text-secondary pl-6 pr-4 border-r dark:border-gray-700 mr-4">
          <HiUserGroup className="h-5 w-5 mr-3 text-tertiary" />
          Friends
        </div>
        <div className="flex items-center space-x-4">
          <FriendTab page="Online" />
          <FriendTab page="All" />
          <FriendTab page="Pending" />
          <FriendTab page="Blocked" />
          <FriendTab page="Add Friend" green />
        </div>
      </Header>

      <div className="h-full pl-76 pt-12">
        <div className="h-full dark:bg-gray-750 px-6 py-4">
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
        </div>
      </div>
    </>
  )
}
