import { forwardRef } from 'react'
import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarUser from '@/components/ui/sidebar/SidebarUser'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'

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
