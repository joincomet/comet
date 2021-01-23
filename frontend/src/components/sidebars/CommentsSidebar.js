import { FiUser } from 'react-icons/fi'
import React, { forwardRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Sidebar from '@/components/ui/sidebar/Sidebar'
import SidebarUser from '@/components/ui/sidebar/SidebarUser'

export default forwardRef(({ post, users }, ref) => {
  return (
    <Sidebar right ref={ref}>
      <div className="px-1">
        <div className="sidebar-label">CREATOR</div>
        <SidebarUser user={post.author} />

        {users && users.length > 0 && (
          <>
            <div className="sidebar-label">
              {users.length} PARTICIPANT{users.length === 1 ? '' : 's'}
            </div>
            {users.map(user => (
              <SidebarUser key={user.id} user={user} />
            ))}
          </>
        )}
      </div>
    </Sidebar>
  )
})
