import LeftSidebar from './LeftSidebar'
import BottomBar from '@/components/BottomBar'
import React, { useState } from 'react'
import SignUpForm from '@/components/SignUpForm'
import { Modal } from 'react-responsive-modal'
import { useRouter } from 'next/router'
import { FiX } from 'react-icons/fi'
import Header from '@/components/Header'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const router = useRouter()

  return (
    <>
      <Modal
        open={!!router.query.login}
        onClose={() => router.push('/')}
        classNames={{
          modal:
            'overflow-hidden bg-transparent shadow-none max-w-screen-sm w-full',
          closeButton: 'top-8 right-8 text-tertiary focus:outline-none'
        }}
        animationDuration={150}
        center
        blockScroll={false}
        closeIcon={<FiX size={20} />}
      >
        <SignUpForm />
      </Modal>

      <div>
        <LeftSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <Header />

        <main className="lg:ml-64 h-full">{children}</main>

        <BottomBar />

        {/*<TopBar setSidebarOpen={setSidebarOpen} />*/}

        {/*<RightSidebar />*/}
      </div>
    </>
  )
}
