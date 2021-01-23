import React from 'react'
import LoginModal from '@/components/modals/login/LoginModal'
import LeftScroller from '@/components/ui/layout/LeftScroller'

export default function Layout({ children }) {
  return (
    <>
      <LoginModal />

      <LeftScroller />

      <div className="h-full">{children}</div>
    </>
  )
}
