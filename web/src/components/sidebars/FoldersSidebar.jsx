import React, { forwardRef } from 'react'
import { useDrop } from 'react-dnd'
import { DragItemTypes } from '@/lib/DragItemTypes'
import toast from 'react-hot-toast'
import Sidebar from '@/components/sidebars/base/Sidebar'
import { useLocation, useParams } from 'react-router-dom'
import { useUserFolders } from '@/components/providers/DataProvider'
import SidebarLabelPlus from '@/components/sidebars/base/SidebarLabelPlus'
import {
  IconFavoritesFolder,
  IconFolder,
  IconReadLaterFolder
} from '@/lib/Icons'
import SidebarItem from '@/components/sidebars/base/SidebarItem'

export default forwardRef(({ show }, ref) => {
  const folders = useUserFolders()
  return (
    <Sidebar right show={show} ref={ref}>
      <div className="px-1.5">
        <SidebarLabelPlus plusLabel="Create a Folder">Folders</SidebarLabelPlus>

        <div className="space-y-0.5">
          {folders.map(folder => (
            <Folder key={folder.id} folder={folder} />
          ))}
        </div>
      </div>
    </Sidebar>
  )
})

function Folder({ folder }) {
  const query = useParams()
  const { pathname } = useLocation()

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: DragItemTypes.POST,
    drop: (item, monitor) => {
      toast.success(`Added to ${folder.name}`)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })
  const isActive = isOver && canDrop
  return (
    <SidebarItem
      active={isActive}
      large
      to={`/folder/${folder.id}`}
      ref={dropRef}
    >
      {folder.name === 'Favorites' && (
        <IconFavoritesFolder className="w-5 h-5 mr-3 text-yellow-500" />
      )}
      {folder.name === 'Read Later' && (
        <IconReadLaterFolder className="w-5 h-5 mr-3 text-blue-500" />
      )}
      {folder.name !== 'Favorites' && folder.name !== 'Read Later' && (
        <IconFolder className="w-5 h-5 mr-3" />
      )}
      {folder.name}
    </SidebarItem>
  )
}
