import { ContextMenuWrapper } from '@/components/ui/context'
import { ContextMenuType } from '@/types/ContextMenuType'
import MessageContextMenu from '@/components/message/MessageContextMenu'

export default function MessageContextMenuWrapper() {
  return (
    <ContextMenuWrapper id={ContextMenuType.Message}>
      <MessageContextMenu />
    </ContextMenuWrapper>
  )
}
