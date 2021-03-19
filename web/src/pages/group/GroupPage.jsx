import Header from '@/components/headers/base/Header'
import HomeSidebar from '@/components/sidebars/HomeSidebar'
import React from 'react'
import GroupUsersSidebar from '@/components/sidebars/GroupUsersSidebar'

export default function GroupPage() {
  return (
    <>
      <Header />
      <HomeSidebar />
      <GroupUsersSidebar />

      <main></main>
    </>
  )
}
