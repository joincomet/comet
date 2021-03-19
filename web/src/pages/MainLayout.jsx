import React from 'react'
import MainSidebar from '@/components/sidebars/HomeSidebar'

export default function MainLayout({ children }) {
  return (
    <>
      <MainSidebar />
      {children}
    </>
  )
}
