import ctl from '@netlify/classnames-template-literals'
import { useContextMenuItem } from '@/components/ui/context/useContextMenuItem'
import { ContextMenuType } from '@/types/ContextMenuType'
import PostContextMenu from '@/components/post/PostContextMenu'
import UserContextMenu from '@/components/user/UserContextMenu'
import MessageContextMenu from '@/components/message/MessageContextMenu'
import CommentContextMenu from '@/components/comment/CommentContextMenu'
import ServerContextMenu from '@/components/server/ServerContextMenu'
import ChannelContextMenu from '@/components/channel/ChannelContextMenu'
import FolderContextMenu from '@/components/folder/FolderContextMenu'

const className = ctl(`
  p-2
  w-48
  dark:bg-gray-900
  rounded
  shadow-lg
  outline-none
`)

export default function ContextMenu({
  bindMenu: { style, ref, role, tabIndex },
  data,
  bindMenuItem,
  hideMenu
}) {
  const ContextMenuItem = useContextMenuItem({ bindMenuItem, hideMenu })

  return (
    <div
      style={{ ...style, zIndex: 999999 }}
      ref={ref}
      role={role}
      tabIndex={tabIndex}
      className={className}
    >
      {data?.type === ContextMenuType.Post && (
        <PostContextMenu post={data?.post} ContextMenuItem={ContextMenuItem} />
      )}
      {data?.type === ContextMenuType.User && (
        <UserContextMenu
          user={data?.user}
          server={data?.server}
          isDm={data?.isDm}
          ContextMenuItem={ContextMenuItem}
        />
      )}
      {data?.type === ContextMenuType.Message && (
        <MessageContextMenu
          message={data?.message}
          ContextMenuItem={ContextMenuItem}
        />
      )}
      {data?.type === ContextMenuType.Comment && (
        <CommentContextMenu
          comment={data?.comment}
          ContextMenuItem={ContextMenuItem}
        />
      )}
      {data?.type === ContextMenuType.Server && (
        <ServerContextMenu
          server={data?.server}
          ContextMenuItem={ContextMenuItem}
        />
      )}
      {data?.type === ContextMenuType.Channel && (
        <ChannelContextMenu
          channel={data?.channel}
          ContextMenuItem={ContextMenuItem}
        />
      )}
      {data?.type === ContextMenuType.Folder && (
        <FolderContextMenu
          folder={data?.folder}
          ContextMenuItem={ContextMenuItem}
        />
      )}
    </div>
  )
}
