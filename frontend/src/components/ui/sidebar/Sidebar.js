import React, { forwardRef } from 'react'
import { SidebarUserInfo } from '@/components/ui/sidebar/SidebarUserInfo'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Scrollbar } from 'react-scrollbars-custom'

export default forwardRef(({ children, right = false }, ref) => {
  return (
    <div
      ref={ref}
      className={`slideout-menu lg:z-10 ml-16 bottom-0 w-60 bg-gray-200 dark:bg-gray-800 top-0 ${
        right ? 'right-0' : 'left-0 pb-12'
      }`}
    >
      <div className="relative h-full w-full">
        <AutoSizer disableWidth>
          {({ height }) => (
            <Scrollbar mobileNative style={{ width: '100%', height }}>
              {children}
            </Scrollbar>
          )}
        </AutoSizer>
      </div>
      {!right && <SidebarUserInfo />}
    </div>
  )
})
