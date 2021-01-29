import React, { forwardRef } from 'react'

export default forwardRef(
  (
    { avatarUrl, name, children, loading = 'eager', className = 'w-10 h-10' },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`rounded-full inline-flex items-center justify-center ${className}`}
      >
        {avatarUrl ? (
          <img
            alt={name}
            src={avatarUrl}
            loading={loading}
            className="rounded-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full inline-flex items-center justify-center">
            {children}
          </div>
        )}
      </div>
    )
  }
)
