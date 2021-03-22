import React from 'react'
import { IconFriends } from '@/lib/Icons'
import Header from '@/components/headers/base/Header'
import { useStore } from '@/lib/stores/useStore'

export default function FriendsHeader({ pendingCount = 0 }) {
  return (
    <Header
      icon={<IconFriends className="h-5 w-5" />}
      title="Friends"
      showDivider
    >
      <div className="flex items-center space-x-4">
        <FriendTab page="Online" />
        <FriendTab page="All" />
        <FriendTab page="Pending" pendingCount={pendingCount} />
        <FriendTab page="Blocked" />
        <FriendTab page="Add Friend" green />
      </div>
    </Header>
  )
}

function FriendTab({ page, green = false, pendingCount = 0 }) {
  const { friendsPage, setFriendsPage } = useStore()
  return (
    <button
      onClick={() => setFriendsPage(page)}
      className={`text-base rounded px-1.5 py-0.5 cursor-pointer select-none flex flex-shrink-0 items-center focus:outline-none ${
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
      {!!pendingCount && (
        <div className="ml-2 rounded-full bg-red-400 w-4 h-4 inline-flex items-center justify-center text-xs font-semibold text-center">
          {pendingCount}
        </div>
      )}
    </button>
  )
}
