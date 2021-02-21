import React from 'react'
import HomeSidebar from '@/pages/home/HomeSidebar'

export default function HomeLayout({ children }) {
  return (
    <>
      <HomeSidebar />
      {children}
    </>
  )
}
