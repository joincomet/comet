import React from 'react'
import { ContextMenuWrapper } from 'react-context-menu-wrapper'
import PostContextMenu from '@/components/context-menus/PostContextMenu'
import UserContextMenu from '@/components/context-menus/UserContextMenu'

export default function ContextMenus() {
  return (
    <>
      {/*<ContextMenuWrapper global>
        <GlobalContextMenu />
      </ContextMenuWrapper>*/}

      <ContextMenuWrapper id="post">
        <PostContextMenu />
      </ContextMenuWrapper>

      <ContextMenuWrapper id="user">
        <UserContextMenu />
      </ContextMenuWrapper>

      {/*<ContextMenuWrapper id="comment">
        <CommentContextMenu />
      </ContextMenuWrapper>

      <ContextMenuWrapper id="message">
        <MessageContextMenu />
      </ContextMenuWrapper>

      <ContextMenuWrapper id="server">
        <ServerContextMenu />
      </ContextMenuWrapper>*/}
    </>
  )
}
