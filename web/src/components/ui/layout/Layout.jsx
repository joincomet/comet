import React from 'react'
import LoginModal from '@/components/modals/login/LoginModal'
import ServerList from '@/components/server-list/ServerList'

export default function Layout({ children }) {
  return (
    <>
      <LoginModal />

      <ServerList />

      {children}
      <div id="popup" />
    </>
  )
}
