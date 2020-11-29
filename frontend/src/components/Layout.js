import LeftSidebar from './LeftSidebar'
import RightSidebar from '@/components/right-sidebar/RightSidebar'
import BottomBar from '@/components/BottomBar'
import React, { useState } from 'react'
import TopBar from '@/components/TopBar'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <LeftSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="h-full min-h-full page">{children}</main>

      <BottomBar />

      <TopBar setSidebarOpen={setSidebarOpen} />

      <RightSidebar />
    </div>
  )
}
