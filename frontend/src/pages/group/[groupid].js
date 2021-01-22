import { useSlideout } from '@/lib/useSlideout'
import Header from '@/components/layout/Header'
import HomeSidebar from '@/components/home/HomeSidebar'
import React from 'react'
import GroupUsersSidebar from '@/components/layout/GroupUsersSidebar'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'

export default function GroupMessagePage() {
  const {
    panel,
    header,
    menuLeft,
    menuRight,
    slideoutLeft,
    slideoutRight
  } = useSlideout()

  const currentUser = useCurrentUser().data

  return (
    <>
      <Header ref={header} slideoutLeft={slideoutLeft} title={`Group Chat`} />
      <HomeSidebar ref={menuLeft} />
      <GroupUsersSidebar ref={menuRight} group={null} />

      <main
        className="slideout-panel slideout-panel--right slideout-panel--header"
        id="panel"
        ref={panel}
      ></main>
    </>
  )
}
