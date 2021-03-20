import React, { forwardRef } from 'react'

export default forwardRef(({ children, chatBar }, ref) => (
  <div className="dark:bg-gray-750 pr-1 flex-shrink min-h-[12rem] h-full">
    <div ref={ref} className={`scrollbar max-h-full mt-auto`}>
      {children}
    </div>
  </div>
))
