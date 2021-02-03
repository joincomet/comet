import React, { forwardRef } from 'react'
import Logo from '@/components/ui/icons/Logo'
import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarSortButtons from '@/components/ui/sidebar/SidebarSortButtons'
import { HiUserAdd } from 'react-icons/hi'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Scrollbar } from 'react-scrollbars-custom'

export default forwardRef((props, ref) => {
  return (
    <Sidebar ref={ref}>
      <div className="px-2">
        <div className="sidebar-label">FEED</div>

        <SidebarSortButtons />

        <div className="sidebar-label">DIRECT MESSAGES</div>
        <div className="space-y-0.5">
          <div className="sidebar-item sidebar-item--large">
            <HiUserAdd className="w-5 h-5 mr-3" />
            New DM
          </div>
        </div>
      </div>
    </Sidebar>
  )
})
