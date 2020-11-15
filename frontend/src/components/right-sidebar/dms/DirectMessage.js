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
    <div ref={dropRef} className="sidebar-item">
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
