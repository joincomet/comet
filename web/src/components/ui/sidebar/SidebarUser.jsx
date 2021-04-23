import UserPopup from '@/components/user/UserPopup'
import UserAvatar from '@/components/user/UserAvatar'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'

export default function SidebarUser({ user, color, nickname, roles = [] }) {
  return (
    <ContextMenuTrigger data={{ type: ContextMenuType.User, user }}>
      <UserPopup user={user} nickname={nickname} roles={roles} placement="left">
        <SidebarItem small>
          <UserAvatar
            user={user}
            size={6}
            showOnline
            dotClassName="w-2 h-2 ring-2 dark:ring-gray-800"
          />
          <div className="ml-3 font-medium text-tertiary">
            {nickname || user.name}
          </div>
        </SidebarItem>
      </UserPopup>
    </ContextMenuTrigger>
  )
}
