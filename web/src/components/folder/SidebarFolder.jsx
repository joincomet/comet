import { useDrop } from 'react-dnd'
import { DragItemTypes } from '@/types/DragItemTypes'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import SidebarItem from '@/components/ui/sidebar/SidebarItem'
import {
  IconFavoritesFolder,
  IconFolder,
  IconReadLaterFolder
} from '@/components/ui/icons/Icons'
import { useMemo } from 'react'
import { useMutation } from 'urql'
import { ADD_POST_TO_FOLDER } from '@/graphql/mutations'
import { useHasServerPermissions } from '@/hooks/useHasServerPermissions'
import { ServerPermission } from '@/types/ServerPermission'
import ContextMenuTrigger from '@/components/ui/context/ContextMenuTrigger'
import { ContextMenuType } from '@/types/ContextMenuType'

export default function SidebarFolder({ folder, serverId }) {
  const [_addPostRes, addPostToFolder] = useMutation(ADD_POST_TO_FOLDER)
  const [canManagePosts] = useHasServerPermissions({
    serverId,
    permissions: [ServerPermission.ManagePosts]
  })

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: DragItemTypes.Post,
    drop: async (post, monitor) => {
      if (serverId && !canManagePosts) {
        toast.error(t('folder.noPermission'))
        return
      }
      addPostToFolder({ folderId: folder.id, postId: post.id }).then(res => {
        if (!res.error) toast.success(t('folder.added', { folder }))
      })
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })
  const isActive = isOver && canDrop

  const { t } = useTranslation()

  const favorites = t('folder.favorites')
  const readLater = t('folder.readLater')

  const folderContents = useMemo(() => {
    if (folder.avatarUrl) {
      return (
        <>
          <div
            className="rounded-full h-7 w-7 mr-3 bg-center bg-contain"
            style={{ backgroundImage: `url(${folder.avatarUrl})` }}
          />
          <span className="truncate">{favorites}</span>
        </>
      )
    }

    if (!serverId && folder.name === favorites)
      return (
        <>
          <IconFavoritesFolder className="w-5 h-5 ml-1 mr-4 text-yellow-500" />
          <span className="truncate">{favorites}</span>
        </>
      )

    if (!serverId && folder.name === readLater)
      return (
        <>
          <IconReadLaterFolder className="w-5 h-5 ml-1 mr-4 text-blue-500" />
          <span className="truncate">{readLater}</span>
        </>
      )

    return (
      <>
        <IconFolder className="w-5 h-5 mr-3" />
        <span className="truncate">{folder.name}</span>
      </>
    )
  }, [serverId, folder, favorites, readLater])

  return (
    <div>
      <ContextMenuTrigger data={{ type: ContextMenuType.Folder, folder }}>
        <SidebarItem
          active={isActive}
          to={`${serverId ? `/server/${serverId}` : '/me'}/folder/${folder.id}`}
          ref={dropRef}
        >
          {folderContents}
        </SidebarItem>
      </ContextMenuTrigger>
    </div>
  )
}
