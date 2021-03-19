import React, { forwardRef } from 'react'
import Sidebar from '@/components/sidebars/base/Sidebar'
import SidebarUser from '@/components/sidebars/base/SidebarUser'
import SidebarLabel from '@/components/sidebars/base/SidebarLabel'

export default forwardRef(({ group }, ref) => {
  return (
    <Sidebar right ref={ref}>
      <div className="px-1.5">
        <SidebarLabel>IN THIS GROUP</SidebarLabel>
        {group &&
          group.users.map(user => <SidebarUser key={user.id} user={user} />)}
      </div>
    </Sidebar>
  )
})
