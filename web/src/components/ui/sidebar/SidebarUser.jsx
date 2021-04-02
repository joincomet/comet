import UserPopup from '@/components/user/UserPopup'
import UserAvatar from '@/components/user/UserAvatar'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'

export default function SidebarUser({ user }) {
  return (
    <UserPopup user={user} placement="left">
      <SidebarItem large>
        <UserAvatar
          user={user}
          size={8}
          showOnline
          dotClassName="w-2.5 h-2.5 ring-3 dark:ring-gray-800"
        />
        <div className="ml-3 font-medium text-tertiary">{user.name}</div>
      </SidebarItem>
    </UserPopup>
  )
}
