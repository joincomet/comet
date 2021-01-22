import Sidebar from './Sidebar'
import BottomBar from '@/components/layout/BottomBar'
import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import LoginModal from '@/components/login/LoginModal'
import { Toaster } from 'react-hot-toast'
import ChatSidebar from '@/components/layout/ChatSidebar'
import ChatRightSidebar from '@/components/layout/ChatRightSidebar'

export default function ChatLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <LoginModal />

      <div className="relative">
        <ChatSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <ChatRightSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/*<Header />*/}

        <main className="md:mx-64 h-full">{children}</main>

        <BottomBar />

        {/*<TopBar setSidebarOpen={setSidebarOpen} />*/}

        {/*<RightSidebar />*/}

        <div id="userpopover" />
        <div id="timepicker" />
        <div id="useroptionsdropdown" />
        <div id="postoptionsdropdown" />
      </div>
    </>
  )
}
