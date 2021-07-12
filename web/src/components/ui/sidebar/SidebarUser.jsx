import UserPopup from '@/components/user/UserPopup'
import UserAvatar from '@/components/user/UserAvatar'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'

export default function SidebarUser({ user, role, server }) {
  return (
    <ContextMenuTrigger
      data={{ type: ContextMenuType.User, user, server, role }}
    >
      <UserPopup user={user} role={role} placement="left">
        <SidebarItem small>
          <UserAvatar
            user={user}
            size={6}
            showOnline
            dotClassName="w-2 h-2 ring-2 dark:ring-gray-800 ring-gray-50"
          />
          <div
            className="ml-3 font-medium text-tertiary"
            style={{ color: role?.color }}
          >
            {user.username}
          </div>
        </SidebarItem>
      </UserPopup>
    </ContextMenuTrigger>
  )
}
