import React, { forwardRef } from 'react'

export default forwardRef(({ children, chatBar, className = '' }, ref) => (
  <div className="dark:bg-gray-750 pr-1 flex-shrink flex flex-col min-h-[12rem] h-full">
    <div
      ref={ref}
      className={`${className} scrollbar h-full ${chatBar ? 'mt-auto' : ''}`}
    >
      {children}
    </div>
  </div>
))
