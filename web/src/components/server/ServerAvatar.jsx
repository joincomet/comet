import React, { forwardRef } from 'react'
import Avatar from '@/components/ui/Avatar'

export default forwardRef(
  ({ server, loading = 'eager', className = 'w-10 h-10' }, ref) => {
    if (!server) return null
    return (
      <Avatar
        ref={ref}
        name={server.name}
        avatarUrl={server.avatarUrl}
        loading={loading}
        className={className}
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
