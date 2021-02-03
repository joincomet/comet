import React, { forwardRef } from 'react'
import Avatar from '@/components/ui/Avatar'

export default forwardRef(
  ({ planet, loading = 'eager', className = 'w-10 h-10' }, ref) => {
    if (!planet) return null
    return (
      <Avatar
        ref={ref}
        name={planet.name}
        avatarUrl={planet.avatarUrl}
        loading={loading}
        className={className}
      >
        <div className="truncate w-10 text-xs text-center font-medium text-tertiary">
          {planet.name}
        </div>
      </Avatar>
    )
  }
)
