import React, { forwardRef } from 'react'
import Sidebar from '@/components/ui/sidebar/Sidebar'

export default forwardRef(({ server }, ref) => {
  return (
    <Sidebar right ref={ref}>
      <div className="px-1">
        <div className="sidebar-label">USERS</div>
      </div>
    </Sidebar>
  )
})
