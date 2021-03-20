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
import { useServerFolders } from '@/components/providers/ServerDataProvider'
import { ServerPermission, useHasServerPermissions } from '@/lib/hasPermission'
import SidebarLabel from '@/components/sidebars/base/SidebarLabel'

export default forwardRef(({ show }, ref) => {
  const { serverId } = useParams()
  const userFolders = useUserFolders()
  const serverFolders = useServerFolders()

  const [canManageFolders] = useHasServerPermissions([
    ServerPermission.ManageFolders
  ])

  return (
    <Sidebar right show={show} ref={ref}>
      <div className="px-1.5">
        {serverId && !!serverFolders.length && (
          <>
            {canManageFolders ? (
              <SidebarLabelPlus plusLabel="Create a Folder">
                Server Folders
              </SidebarLabelPlus>
            ) : (
              <SidebarLabel>Server Folders</SidebarLabel>
            )}

            <div className="space-y-0.5">
              {serverFolders.map(folder => (
                <Folder key={folder.id} folder={folder} />
              ))}
            </div>
          </>
        )}

        <SidebarLabelPlus plusLabel="Create a Folder">
          Your Folders
        </SidebarLabelPlus>

        <div className="space-y-0.5">
          {userFolders.map(folder => (
            <Folder key={folder.id} folder={folder} />
          ))}
        </div>
      </div>
    </Sidebar>
  )
})

function Folder({ folder }) {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: DragItemTypes.POST,
    drop: (item, monitor) => {
      toast.success(`Added to ${folder.name}!`)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })
  const isActive = isOver && canDrop
  return (
    <SidebarItem active={isActive} to={`/folder/${folder.id}`} ref={dropRef}>
      {folder.name === 'Favorites' && (
        <IconFavoritesFolder className="w-5 h-5 mr-3 text-yellow-500" />
      )}
      {folder.name === 'Read Later' && (
        <IconReadLaterFolder className="w-5 h-5 mr-3 text-blue-500" />
      )}
      {folder.name !== 'Favorites' && folder.name !== 'Read Later' && (
        <IconFolder className="w-5 h-5 mr-3" />
      )}
      <span className="truncate">{folder.name}</span>
    </SidebarItem>
  )
}
