import React from 'react'
import MainSidebar from '@/pages/MainSidebar'

export default function MainLayout({ children }) {
  return (
    <>
      <MainSidebar />
      {children}
    </>
  )
}
