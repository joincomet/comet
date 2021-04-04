import { ContextMenuType } from '@/types/ContextMenuType'
import { ContextMenuWrapper } from '@/components/ui/context'
import CommentContextMenu from '@/components/comment/CommentContextMenu'

export default function CommentContextMenuWrapper() {
  return (
    <ContextMenuWrapper id={ContextMenuType.Comment}>
      <CommentContextMenu />
    </ContextMenuWrapper>
  )
}
