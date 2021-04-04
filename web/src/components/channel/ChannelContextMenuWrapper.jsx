import { ContextMenuType } from '@/types/ContextMenuType'
import { ContextMenuWrapper } from '@/components/ui/context'
import ChannelContextMenu from '@/components/channel/ChannelContextMenu'

export default function ChannelContextMenuWrapper() {
  return (
    <ContextMenuWrapper id={ContextMenuType.Channel}>
      <ChannelContextMenu />
    </ContextMenuWrapper>
  )
}
