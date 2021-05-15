import { forwardRef } from 'react'
import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarUser from '@/components/ui/sidebar/SidebarUser'
import SidebarLabel from '@/components/ui/sidebar/SidebarLabel'
import { useStore } from '@/hooks/useStore'

export default forwardRef(({ users }, ref) => {
  const showUsers = useStore(s => s.showUsers)
  return (
    <Sidebar right ref={ref} show={showUsers}>
      <div className="px-1.5">
        <SidebarLabel>IN THIS GROUP</SidebarLabel>
        {users.map(user => (
          <SidebarUser key={user.id} user={user} />
        ))}
      </div>
    </Sidebar>
  )
})
