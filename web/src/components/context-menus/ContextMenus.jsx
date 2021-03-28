import { ContextMenuWrapper } from 'react-context-menu-wrapper'
import PostContextMenu from '@/components/context-menus/PostContextMenu'
import UserContextMenu from '@/components/context-menus/UserContextMenu'
import ServerContextMenu from '@/components/context-menus/ServerContextMenu'
import { ContextMenuType } from '@/components/context-menus/ContextMenuType'

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

      {/*
      <ContextMenuWrapper id={ContextMenuType.Comment}>
        <CommentContextMenu />
      </ContextMenuWrapper>

      <ContextMenuWrapper id={ContextMenuType.Message}>
        <MessageContextMenu />
      </ContextMenuWrapper>

      <ContextMenuWrapper id={ContextMenuType.Folder}>
        <FolderContextMenu />
      </ContextMenuWrapper>
      */}
    </>
  )
}
