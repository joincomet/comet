import { ContextMenuType } from '@/types/ContextMenuType'
import ServerContextMenu from '@/components/server/ServerContextMenu'
import { ContextMenuWrapper } from '@/components/ui/context'

export default function ServerContextMenuWrapper() {
  return (
    <ContextMenuWrapper id={ContextMenuType.Server}>
      <ServerContextMenu />
    </ContextMenuWrapper>
  )
}
