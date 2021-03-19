import React, { forwardRef } from 'react'
import Sidebar from '@/components/sidebars/base/Sidebar'
import SidebarUser from '@/components/sidebars/base/SidebarUser'
import SidebarLabel from '@/components/sidebars/base/SidebarLabel'
import SidebarLabelPlus from '@/components/sidebars/base/SidebarLabelPlus'

export default forwardRef(({ post, users }, ref) => {
  return (
    <Sidebar right ref={ref}>
      <div className="px-1">
        <SidebarLabel>CREATOR</SidebarLabel>
        <SidebarUser user={post.author} />

        {users && users.length > 0 && (
          <>
            <SidebarLabelPlus plusLabel="Add User to Group">
              {users.length} PARTICIPANT{users.length === 1 ? '' : 's'}
            </SidebarLabelPlus>
            {users.map(user => (
              <SidebarUser key={user.id} user={user} />
            ))}
          </>
        )}
      </div>
    </Sidebar>
  )
})
