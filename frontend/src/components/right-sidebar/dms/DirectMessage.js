import { useDrop } from 'react-dnd'
import { DragItemTypes } from '@/lib/DragItemTypes'
import React from 'react'
import Image from 'next/image'

const dmClass =
  'cursor-pointer relative text-xs font-medium dark:hover:bg-gray-900 hover:bg-gray-200 px-6 h-10 flex items-center hover:text-blue-500 dark:hover:text-blue-500 text-tertiary transition'

export default function DirectMessage({ user }) {
  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: DragItemTypes.POST,
    drop: () => ({ user }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  const isActive = canDrop && isOver

  return (
    <div ref={dropRef} className={dmClass}>
      <div className="w-8 h-8 relative">
        <div className="absolute w-2.5 h-2.5 ring dark:ring-gray-800 ring-white bg-green-500 rounded-full bottom-0 right-0 z-10" />
        <Image
          width={32}
          height={32}
          alt={user.profile.realName}
          className="object-cover rounded-full"
          src={user.avatarURL || '/avatar.jpg'}
        />
      </div>
      <span className="ml-3">{user.profile.realName}</span>
    </div>
  )
}
