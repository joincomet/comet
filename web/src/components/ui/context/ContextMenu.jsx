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
import { getOS } from '@/utils/getOS'
import ContextMenuSection from '@/components/ui/context/ContextMenuSection'
import ContextMenuDivider from '@/components/ui/context/ContextMenuDivider'
import { useCopyToClipboard } from 'react-use'

const className = ctl(`
  p-2
  w-48
  dark:bg-gray-900
  rounded
  shadow-lg
  outline-none
  bg-white
`)

export default function ContextMenu({
  bindMenu: { style, ref, role, tabIndex },
  data,
  bindMenuItem,
  hideMenu,
  isRight
}) {
  const ContextMenuItem = useContextMenuItem({
    bindMenuItem,
    hideMenu,
    isRight
  })

  const copyToClipboard = useCopyToClipboard()[1]

  const url = data?.href ? new URL(data.href) : null
  const isCometLink = url && url.origin === window.location.origin

  const os = getOS()
  const isMac = os === 'Mac OS'

  const props = { ...(data ?? {}), ContextMenuItem }

  return (
    <div
      style={{ ...style, zIndex: 999999 }}
      ref={ref}
      role={role}
      tabIndex={tabIndex}
      className={className}
      onMouseDown={e => {
        e.stopPropagation()
        e.preventDefault()
      }}
    >
      {!!window.getSelection().toString() && (
        <>
          <ContextMenuItem
            label={
              <div className="flex items-center w-full">
                Copy
                <div className="ml-auto">{isMac ? '⌘+C' : 'Ctrl+C'}</div>
              </div>
            }
            onClick={() => document.execCommand('copy')}
          />
          <ContextMenuDivider />
        </>
      )}

      {data?.type === ContextMenuType.Post && <PostContextMenu {...props} />}
      {data?.type === ContextMenuType.User && <UserContextMenu {...props} />}
      {data?.type === ContextMenuType.Message && (
        <MessageContextMenu {...props} />
      )}
      {data?.type === ContextMenuType.Comment && (
        <CommentContextMenu {...props} />
      )}
      {data?.type === ContextMenuType.Server && (
        <ServerContextMenu {...props} />
      )}
      {data?.type === ContextMenuType.Channel && (
        <ChannelContextMenu {...props} />
      )}
      {data?.type === ContextMenuType.Folder && (
        <FolderContextMenu {...props} />
      )}

      {!!data?.href && !isCometLink && (
        <>
          <ContextMenuDivider />
          <ContextMenuSection>
            <ContextMenuItem
              label="Copy Link"
              onClick={() => copyToClipboard(data.href)}
            />
            <ContextMenuItem
              label="Open Link"
              onClick={() => window.open(data.href, '_blank')}
            />
          </ContextMenuSection>
        </>
      )}
    </div>
  )
}
