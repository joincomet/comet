import { IconFriends } from '@/components/ui/icons/Icons'
import Header from '@/components/ui/header/Header'
import { useStore } from '@/hooks/useStore'
import HeaderTab from '@/components/ui/header/HeaderTab'
import CountBadge from '@/components/ui/CountBadge'

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
  const [friendsPage, setFriendsPage] = useStore(s => [
    s.friendsPage,
    s.setFriendsPage
  ])
  return (
    <HeaderTab
      page={page}
      green={green}
      currentPage={friendsPage}
      setCurrentPage={setFriendsPage}
    >
      {page}
      {!!pendingCount && (
        <div className="ml-2">
          <CountBadge count={pendingCount} />
        </div>
      )}
    </HeaderTab>
  )
}
