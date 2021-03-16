import { HiStar, HiArchive, HiPlus } from 'react-icons/hi'
import React, { forwardRef } from 'react'
import { FiFolder } from 'react-icons/fi'
import { useDrop } from 'react-dnd'
import { DragItemTypes } from '@/lib/DragItemTypes'
import toast from 'react-hot-toast'
import Sidebar from '@/components/ui/sidebar/Sidebar'
import { useLocation, useParams } from 'react-router-dom'
import { useUserFolders } from '@/components/DataProvider'

export default forwardRef((props, ref) => {
  const folders = useUserFolders()
  return (
    <Sidebar right ref={ref} header>
      <div className="px-2">
        <div className="sidebar-label sidebar-label--plus">
          FOLDERS
          <HiPlus className="w-4 h-4" />
        </div>

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
    <div
      ref={dropRef}
      className={`sidebar-item sidebar-item--large ${
        pathname === '/folder/[folderid]' && query.folderId === folder.id
          ? 'dark:bg-gray-800 text-secondary'
          : 'text-tertiary'
      } ${isActive ? 'bg-gray-200 dark:bg-gray-750' : ''}`}
    >
      {folder.name === 'Favorites' && (
        <HiStar className="w-5 h-5 text-yellow-500" />
      )}
      {folder.name === 'Read Later' && (
        <HiArchive className="w-5 h-5 text-blue-500" />
      )}
      {folder.name !== 'Favorites' && folder.name !== 'Read Later' && (
        <FiFolder className="w-5 h-5" />
      )}
      <span className="ml-3">{folder.name}</span>
    </div>
  )
}
