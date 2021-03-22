import React, { forwardRef } from 'react'
import { IconUser } from '@/lib/Icons'
import Avatar from '@/components/avatars/base/Avatar'

export default forwardRef(
  (
    {
      user,
      loading = 'eager',
      size = 12,
      showOnline = false,
      className = '',
      dotClassName = ''
    },
    ref
  ) => {
    if (!user) return null
    return (
      <Avatar
        ref={ref}
        avatarUrl={user.avatarUrl}
        loading={loading}
        className={`${className} bg-gray-200 dark:bg-gray-700 cursor-pointer`}
        size={size}
      >
        {showOnline && (
          <div
            className={`absolute bottom-0 right-0 rounded-full z-10 ${dotClassName} ${
              user.isOnline ? 'bg-green-500' : 'bg-gray-600'
            }`}
          />
        )}
        {!user.avatarUrl && <IconUser className="text-mid w-2/3 h-2/3" />}
      </Avatar>
    )
  }
)
