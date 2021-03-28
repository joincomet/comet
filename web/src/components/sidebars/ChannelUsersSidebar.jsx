import { forwardRef } from 'react'
import Sidebar from '@/components/sidebars/base/Sidebar'
import SidebarLabel from '@/components/sidebars/base/SidebarLabel'

export default forwardRef(({ server }, ref) => {
  return (
    <Sidebar right ref={ref}>
      <div className="px-1.5">
        <SidebarLabel>USERS</SidebarLabel>
      </div>
    </Sidebar>
  )
})
