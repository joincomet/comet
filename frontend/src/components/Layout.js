import LeftSidebar from './LeftSidebar'
import BottomBar from '@/components/BottomBar'
import React, { useState } from 'react'
import LoginForm from '@/components/login/LoginForm'
import { Modal } from 'react-responsive-modal'
import { useRouter } from 'next/router'
import { FiEdit } from 'react-icons/fi'
import Header from '@/components/Header'
import LoginModal from '@/components/login/LoginModal'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const router = useRouter()

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

        <div className="fixed z-50 bottom-8 left-64 right-0 mycontainer grid grid-cols-3">
          <div className="col-span-2 flex">
            <div className="opacity-90 hover:opacity-100 rounded-full shadow-md bg-blue-600 mx-auto h-8 w-48 flex items-center justify-center text-xs font-semibold uppercase tracking-widest cursor-pointer transition transform hover:scale-105">
              Create Post
              <FiEdit size={16} className="ml-3" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
