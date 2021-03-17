import React, { forwardRef } from 'react'

export default forwardRef(
  (
    { avatarUrl, name, children, loading = 'eager', className = '', size = 12 },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`relative rounded-full inline-flex items-center justify-center bg-cover bg-center ${className}`}
        style={{
          width: `${size / 4}rem`,
          height: `${size / 4}rem`,
          backgroundImage: `url(${avatarUrl})`
        }}
      >
        {children}
      </div>
    )
  }
)
