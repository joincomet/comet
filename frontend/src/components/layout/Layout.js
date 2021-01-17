import React from 'react'
import LoginModal from '@/components/login/LoginModal'
import NavScroller from '@/components/layout/NavScroller'

export default function Layout({ children }) {
  return (
    <>
      <LoginModal />

      <NavScroller />

      <div className="h-full">{children}</div>
    </>
  )
}
