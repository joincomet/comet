import UserPopup from '@/components/popups/UserPopup'
import UserAvatar from '@/components/avatars/UserAvatar'
import SidebarItem from '@/components/sidebars/base/SidebarItem'

export default function SidebarUser({ user }) {
  return (
    <UserPopup user={user} placement="left">
      <SidebarItem large>
        <UserAvatar className="w-8 h-8" user={user} size={9} />
        <div className="ml-3 font-medium text-tertiary">{user.name}</div>
      </SidebarItem>
    </UserPopup>
  )
}
