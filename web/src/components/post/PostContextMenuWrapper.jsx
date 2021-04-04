import { ContextMenuType } from '@/types/ContextMenuType'
import PostContextMenu from '@/components/post/PostContextMenu'
import { ContextMenuWrapper } from '@/components/ui/context'

export default function PostContextMenuWrapper() {
  return (
    <ContextMenuWrapper id={ContextMenuType.Post}>
      <PostContextMenu />
    </ContextMenuWrapper>
  )
}
