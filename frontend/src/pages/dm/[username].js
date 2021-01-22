import { useSlideout } from '@/lib/useSlideout'
import Header from '@/components/layout/Header'
import HomeSidebar from '@/components/home/HomeSidebar'
import React from 'react'

export default function DirectMessagePage() {
  const {
    panel,
    header,
    menuLeft,
    menuRight,
    slideoutLeft,
    slideoutRight
  } = useSlideout()

  return (
    <>
      <Header
        ref={header}
        slideoutLeft={slideoutLeft}
        title={`Direct Message`}
        right
      />
      <HomeSidebar ref={menuLeft} />

      <main
        className="slideout-panel slideout-panel--header"
        id="panel"
        ref={panel}
      ></main>
    </>
  )
}
