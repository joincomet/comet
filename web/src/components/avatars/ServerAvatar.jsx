import { forwardRef, memo } from 'react'
import Avatar from '@/components/avatars/base/Avatar'

export default forwardRef(
  (
    { server, loading = 'eager', size = 12, className = '', style = {} },
    ref
  ) => {
    if (!server) return null
    return (
      <Avatar
        ref={ref}
        avatarUrl={server.avatarUrl}
        loading={loading}
        className={`${className} cursor-pointer`}
        size={size}
        style={style}
      >
        {!server.avatarUrl && (
          <div className="truncate w-10 text-xs text-center font-medium text-tertiary">
            {server.name}
          </div>
        )}
      </Avatar>
    )
  }
)
