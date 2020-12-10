import LeftSidebar from './LeftSidebar'
import RightSidebar from '@/components/right-sidebar/RightSidebar'
import BottomBar from '@/components/BottomBar'
import React, { useState } from 'react'
import TopBar from '@/components/TopBar'
import SignUpForm from '@/components/SignUpForm'
import { Modal } from 'react-responsive-modal'
import { useRouter } from 'next/router'
import { FiX } from 'react-icons/fi'
import PermanentHeader from '@/components/PermanentHeader'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const router = useRouter()

  return (
    <>
      <Modal
        open={!!router.query.login}
        onClose={() => router.push('/')}
        classNames={{
          modal: 'overflow-hidden bg-transparent shadow-none p-24',
          closeButton: 'top-28 right-28 text-tertiary focus:outline-none'
        }}
        animationDuration={150}
        center
        blockScroll={false}
        closeIcon={<FiX size={20} />}
      >
        <SignUpForm className="m-24" />
      </Modal>

      <div>
        <LeftSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <PermanentHeader />

        <main className="ml-64 mt-14">{children}</main>

        <BottomBar />

        <TopBar setSidebarOpen={setSidebarOpen} />

        {/*<RightSidebar />*/}
      </div>
    </>
  )
}
