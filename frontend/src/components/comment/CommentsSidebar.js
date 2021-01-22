import { FiUser } from 'react-icons/fi'
import React, { forwardRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Sidebar from '@/components/layout/Sidebar'
import SidebarUser from '@/components/layout/SidebarUser'

export default forwardRef(({ post, users }, ref) => {
  return (
    <Sidebar right ref={ref}>
      <div className="px-2">
        <div className="sidebar-label">CREATOR</div>
        <SidebarUser user={post.author} />

        <div className="sidebar-label">
          {users.length} PARTICIPANT{users.length === 1 ? '' : 's'}
        </div>
        {users.map(user => (
          <SidebarUser key={user.id} user={user} />
        ))}
      </div>
    </Sidebar>
  )
})
