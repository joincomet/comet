import { forwardRef } from 'react'
import Avatar from '@/components/ui/Avatar'

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
          <div className="truncate w-10 text-lg text-center font-medium text-tertiary">
            {server.initials}
          </div>
        )}
      </Avatar>
    )
  }
)
