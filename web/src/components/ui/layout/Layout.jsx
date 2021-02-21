import React from 'react'
import LoginModal from '@/components/modals/login/LoginModal'
import PlanetScroller from '@/components/planet-scroller/PlanetScroller'

export default function Layout({ children }) {
  return (
    <>
      <LoginModal />

      <PlanetScroller />

      {children}
      <div id="popup" />
    </>
  )
}
