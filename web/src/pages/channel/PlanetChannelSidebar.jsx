import React, { forwardRef, useEffect } from 'react'
import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarUser from '@/components/ui/sidebar/SidebarUser'

export default forwardRef(({ planet }, ref) => {
  return (
    <Sidebar right ref={ref}>
      <div className="px-1">
        <div className="sidebar-label">USERS</div>
      </div>
    </Sidebar>
  )
})
