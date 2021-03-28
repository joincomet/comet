import { IconFriends } from '@/lib/Icons'
import Header from '@/components/headers/base/Header'
import { useStore } from '@/lib/stores/useStore'
import HeaderTab from '@/components/headers/base/HeaderTab'

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
    <HeaderTab
      page={page}
      green={green}
      currentPage={friendsPage}
      setCurrentPage={setFriendsPage}
    >
      {page}
      {!!pendingCount && (
        <div className="ml-2 rounded-full bg-red-400 w-4 h-4 inline-flex items-center justify-center text-xs font-semibold text-center">
          {pendingCount}
        </div>
      )}
    </HeaderTab>
  )
}
