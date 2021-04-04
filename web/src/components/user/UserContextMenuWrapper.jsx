import { ContextMenuType } from '@/types/ContextMenuType'
import UserContextMenu from '@/components/user/UserContextMenu'
import { ContextMenuWrapper } from '@/components/ui/context'

export default function UserContextMenuWrapper() {
  return (
    <ContextMenuWrapper id={ContextMenuType.User}>
      <UserContextMenu />
    </ContextMenuWrapper>
  )
}
