import React, { forwardRef } from 'react'
import { SidebarUserInfo } from '@/components/ui/sidebar/SidebarUserInfo'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Scrollbar } from 'react-scrollbars-custom'

export default forwardRef(({ children, right = false }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex fixed bottom-0 w-60 bg-gray-200 dark:bg-gray-800 ${
        right
          ? 'right-0 top-12 electron:top-17.5'
          : 'electron:top-5.5 top-0 left-16 pb-12 rounded-tl-lg'
      }`}
    >
      <div className="relative h-full w-full">{children}</div>
      {!right && <SidebarUserInfo />}
    </div>
  )
})