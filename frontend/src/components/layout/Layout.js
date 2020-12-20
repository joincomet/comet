import LeftSidebar from './LeftSidebar'
import BottomBar from '@/components/layout/BottomBar'
import React, { useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import Header from '@/components/layout/Header'
import LoginModal from '@/components/login/LoginModal'
import { Hydrate } from 'react-query/hydration'
import CreatePostModal from '@/components/createpost/CreatePostModal'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <LoginModal />

      <div className="relative">
        <LeftSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <Header />

        <main className="lg:ml-64 h-full">{children}</main>

        <BottomBar />

        {/*<TopBar setSidebarOpen={setSidebarOpen} />*/}

        {/*<RightSidebar />*/}

        <div id="userpopover" />
        <div id="timepicker" />
        <div id="useroptionsdropdown" />
      </div>
    </>
  )
}
