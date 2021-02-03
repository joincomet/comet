import React, { forwardRef } from 'react'
import { SidebarUserInfo } from '@/components/ui/sidebar/SidebarUserInfo'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Scrollbar } from 'react-scrollbars-custom'

export default forwardRef(({ children, right = false }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex ${
        window.electron ? 'top-5.5' : 'top-0'
      } fixed bottom-0 w-60 bg-gray-200 dark:bg-gray-800 ${
        right ? 'right-0' : 'left-16 pb-12'
      }`}
    >
      <div className="relative h-full w-full">
        <Scrollbar mobileNative translateContentSizeYToHolder width="100%">
          {children}
        </Scrollbar>
      </div>
      {!right && <SidebarUserInfo />}
    </div>
  )
})
