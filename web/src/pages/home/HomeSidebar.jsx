import React, { forwardRef } from 'react'
import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarSortButtons from '@/components/ui/sidebar/SidebarSortButtons'
import { HiPlus } from 'react-icons/hi'

export default forwardRef((props, ref) => {
  return (
    <Sidebar ref={ref}>
      <div className="h-12 border-b dark:border-gray-850 shadow flex items-center px-5 text-base font-medium">
        Home
      </div>

      <div className="px-1.5">
        <div className="sidebar-label">FEED</div>

        <SidebarSortButtons />

        <div className={`sidebar-label sidebar-label--plus`}>
          DIRECT MESSAGES
          <HiPlus className="w-4 h-4" />
        </div>
      </div>
    </Sidebar>
  )
})
