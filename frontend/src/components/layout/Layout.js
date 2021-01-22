import Sidebar from './Sidebar'
import BottomBar from '@/components/layout/BottomBar'
import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import LoginModal from '@/components/login/LoginModal'
import { Toaster } from 'react-hot-toast'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <LoginModal />

      <div className="relative">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <Header />

        <main className="md:ml-64 h-full">{children}</main>

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
