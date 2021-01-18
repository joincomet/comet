import { RiFireFill } from 'react-icons/ri'
import {
  HiSortAscending,
  HiClock,
  HiFolder,
  HiStar,
  HiLibrary,
  HiArchive,
  HiFolderAdd
} from 'react-icons/hi'
import React, { forwardRef } from 'react'
import { useRouter } from 'next/router'
import { useFolders } from '@/lib/queries/useFolders'
import { FiFolder, FiFolderPlus } from 'react-icons/fi'
import { useDrop } from 'react-dnd'
import { DragItemTypes } from '@/lib/DragItemTypes'
import toast from 'react-hot-toast'
import Sidebar from '@/components/layout/Sidebar'

export default forwardRef((props, ref) => {
  const folders = useFolders().data || []
  return (
    <Sidebar right ref={ref}>
      <div className="px-1">
        <div className="sidebar-label">FOLDERS</div>

        <div className="space-y-0.5">
          <div className="sidebar-item sidebar-item--large">
            <FiFolderPlus className="w-5 h-5 mr-3" />
            New Folder
          </div>

          {folders.map(folder => (
            <Folder key={folder.id} folder={folder} />
          ))}
        </div>
      </div>
    </Sidebar>
  )
})

function Folder({ folder }) {
  const { query, pathname } = useRouter()

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: DragItemTypes.POST,
    drop: (item, monitor) => {
      console.log(item)
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
        pathname === '/folder/[folderid]' && query.folderid === folder.id
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
