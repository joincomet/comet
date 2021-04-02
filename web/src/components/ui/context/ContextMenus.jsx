import { ContextMenuWrapper } from '@/components/ui/context/index'
import PostContextMenu from '@/components/post/PostContextMenu'
import UserContextMenu from '@/components/user/UserContextMenu'
import ServerContextMenu from '@/components/server/ServerContextMenu'
import { ContextMenuType } from '@/types/ContextMenuType'
import MessageContextMenu from '@/components/message/MessageContextMenu'

export default function ContextMenus() {
  return (
    <>
      <ContextMenuWrapper global />

      <ContextMenuWrapper id={ContextMenuType.Post}>
        <PostContextMenu />
      </ContextMenuWrapper>

      <ContextMenuWrapper id={ContextMenuType.User}>
        <UserContextMenu />
      </ContextMenuWrapper>

      <ContextMenuWrapper id={ContextMenuType.Server}>
        <ServerContextMenu />
      </ContextMenuWrapper>

      <ContextMenuWrapper id={ContextMenuType.Message}>
        <MessageContextMenu />
      </ContextMenuWrapper>

      {/*
      <ContextMenuWrapper id={ContextMenuType.Comment}>
        <CommentContextMenu />
      </ContextMenuWrapper>

      <ContextMenuWrapper id={ContextMenuType.Folder}>
        <FolderContextMenu />
      </ContextMenuWrapper>
      */}
    </>
  )
}
