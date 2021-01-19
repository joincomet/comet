import React from 'react'
import LoginModal from '@/components/login/LoginModal'
import PlanetsScroller from '@/components/layout/PlanetsScroller'

export default function Layout({ children }) {
  return (
    <>
      <LoginModal />

      <PlanetsScroller />

      <div id="#userpopover" />
      <div id="#planetpopover" />

      <div className="h-full">{children}</div>
    </>
  )
}
