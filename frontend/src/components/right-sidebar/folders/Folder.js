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
        isActive ? 'dark:bg-gray-700' : 'dark:bg-gray-800'
      } flex flex-row items-center h-12 px-6 transition duration-150 ease-in-out cursor-pointer text-secondary dark:hover:bg-gray-700`}
    >
      {name === 'Favorites' ? (
        <FiStar className={`w-8 h-8 p-1.5 ${color || 'text-yellow-500'}`} />
      ) : (
        <FiFolder className={`w-8 h-8 p-1.5 ${color || 'text-blue-500'}`} />
      )}

      <span className="ml-6 text-sm font-medium">{name}</span>

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
