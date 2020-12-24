import LeftSidebar from './LeftSidebar'
import BottomBar from '@/components/layout/BottomBar'
import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import LoginModal from '@/components/login/LoginModal'
import { Toaster } from 'react-hot-toast'

const toastClass = 'bg-white dark:bg-gray-800 text-sm font-medium text-primary'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: toastClass,
          success: {
            className: toastClass,
            iconTheme: {
              primary: '#059669'
            }
          },
          error: {
            className: toastClass,
            iconTheme: {
              primary: '#EF4444'
            }
          }
        }}
      />

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
        <div id="postoptionsdropdown" />
      </div>
    </>
  )
}
