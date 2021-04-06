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

export default function SidebarFolder({ folder, serverId }) {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: DragItemTypes.Post,
    drop: (item, monitor) => {
      toast.success(t('folder.added', { folder }))
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
    if (!serverId && folder.name === favorites)
      return (
        <>
          <IconFavoritesFolder className="w-5 h-5 mr-3 text-yellow-500" />
          <span className="truncate">{favorites}</span>
        </>
      )

    if (!serverId && folder.name === readLater)
      return (
        <>
          <IconReadLaterFolder className="w-5 h-5 mr-3 text-blue-500" />
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
    <SidebarItem
      active={isActive}
      to={`${serverId ? `/server/${serverId}` : ''}/folder/${folder.id}`}
      ref={dropRef}
    >
      {folderContents}
    </SidebarItem>
  )
}
