import { useDrop } from 'react-dnd'
import { ItemTypes } from '@/ItemTypes'
import React from 'react'
import Image from 'next/image'

export default function DirectMessage({ user }) {
  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: ItemTypes.POST,
    drop: () => ({ user }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  const isActive = canDrop && isOver

  return (
    <div
      ref={dropRef}
      className={`${
        isActive ? 'dark:bg-gray-700' : 'dark:bg-gray-800'
      } flex flex-row items-center h-12 px-6 transition duration-150 ease-in-out cursor-pointer text-secondary dark:hover:bg-gray-700`}
    >
      {user.avatarURL ? (<Image
        width={32}
        height={32}
        alt={user.profile.realName}
        className="object-cover w-8 h-8 rounded-full"
        src={user.avatarURL}
      />) : (<div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" /> )}
      <span className="ml-6 text-sm font-medium">{user.profile.realName}</span>
    </div>
  )
}
