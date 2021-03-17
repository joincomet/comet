import React, { forwardRef } from 'react'
import { HiUser } from 'react-icons/hi'
import Avatar from '@/components/ui/Avatar'

export default forwardRef(
  (
    {
      user,
      loading = 'eager',
      size = 12,
      showOnline = false,
      className = 'dark:bg-gray-700',
      dotClassName = ''
    },
    ref
  ) => {
    if (!user) return null
    return (
      <Avatar
        ref={ref}
        name={user.username}
        avatarUrl={user.avatarUrl}
        loading={loading}
        className={`${className}`}
        size={size}
      >
        {showOnline && (
          <div
            className={`absolute bottom-0 right-0 rounded-full z-10 ${dotClassName} ${
              user.isOnline ? 'bg-green-500' : 'bg-gray-600'
            }`}
          />
        )}
        <HiUser className="text-mid w-1/2 h-1/2" />
      </Avatar>
    )
  }
)
