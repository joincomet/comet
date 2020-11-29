import { useDrop } from 'react-dnd'
import { ItemTypes } from '@/ItemTypes'
import { FiFolder, FiGlobe, FiStar, FiUsers } from 'react-icons/fi'
import React from 'react'
import Tippy from '@tippyjs/react'

export const folderClass =
  'cursor-pointer relative text-xs font-medium dark:hover:bg-gray-900 hover:bg-gray-200 px-6 h-10 flex items-center hover:text-blue-500 dark:hover:text-blue-500 text-tertiary transition'

export default function Folder({ folder }) {
  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: ItemTypes.POST,
    drop: () => ({ folder }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  const isActive = canDrop && isOver

  const { name, color, type } = folder

  return (
    <div ref={dropRef} className={folderClass}>
      {name === 'Favorites' ? (
        <FiStar
          width={20}
          height={20}
          className={`w-5 h-5`}
          style={{ color: color || '#eab308' }}
        />
      ) : (
        <FiFolder
          width={20}
          height={20}
          className={`w-5 h-5`}
          style={{ color: color || '#3b82f6' }}
        />
      )}

      <span className="ml-6">{name}</span>

      {type && type !== 'PRIVATE' ? (
        <Tippy content={type === 'PUBLIC' ? 'Public folder' : 'Shared folder'}>
          <span className="ml-auto">
            {type === 'PUBLIC' ? (
              <FiGlobe className="w-4 h-4 text-tertiary" />
            ) : (
              <FiUsers className="w-4 h-4 text-tertiary" />
            )}
          </span>
        </Tippy>
      ) : null}
    </div>
  )
}
