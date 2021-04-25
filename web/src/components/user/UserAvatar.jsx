import { forwardRef } from 'react'
import { IconUser } from '@/components/ui/icons/Icons'
import Avatar from '@/components/ui/Avatar'
import { colorsMap } from '@/utils/colorsMap'

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
    return (
      <Avatar
        ref={ref}
        avatarUrl={user?.avatarUrl}
        loading={loading}
        className={`${className} cursor-pointer rounded-full`}
        size={size}
        style={
          !user?.avatarUrl ? { backgroundColor: colorsMap[user?.color] } : {}
        }
      >
        {showOnline && (
          <div
            className={`absolute bottom-0 right-0 rounded-full z-10 ${dotClassName} ${
              user?.isOnline ? 'bg-green-500' : 'bg-gray-600'
            }`}
          />
        )}
        {!user?.avatarUrl && <IconUser className="text-primary w-2/3 h-2/3" />}
      </Avatar>
    )
  }
)
