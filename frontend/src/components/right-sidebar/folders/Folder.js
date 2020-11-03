import { useDrop } from 'react-dnd'
import { ItemTypes } from '@/ItemTypes'
import { FiFolder, FiGlobe, FiStar, FiUsers } from 'react-icons/fi'
import React from 'react'
import Tippy from '@tippyjs/react'

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
    <div
      ref={dropRef}
      className={`${
        isActive ? 'dark:bg-gray-900' : 'dark:bg-gray-800'
      } flex flex-row items-center py-2 px-6 transition duration-150 ease-in-out cursor-pointer text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:bg-gray-900`}
    >
      {name === 'Favorites' ? (
        <FiStar
          width={20}
          height={20}
          className={`w-5 h-5 p-0.5`}
          style={{ color: color || '#eab308' }}
        />
      ) : (
        <FiFolder
          width={20}
          height={20}
          className={`w-5 h-5 p-0.5`}
          style={{ color: color || '#3b82f6' }}
        />
      )}

      <span className="text-xs ml-6 font-semibold tracking-wide">{name}</span>

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
