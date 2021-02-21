import React from 'react'
import PlanetSidebar from '@/pages/planet/PlanetSidebar'
import { useParams } from 'react-router-dom'
import { useCurrentUserQuery } from '@/lib/queries'

export default function PlanetLayout({ children }) {
  const { planetId } = useParams()
  const [{ data }] = useCurrentUserQuery()
  if (!data) return null
  const {
    currentUser: { planets }
  } = data
  const planet = planets.find(p => p.id === planetId)

  return (
    <>
      <PlanetSidebar planet={planet} />
      {children}
    </>
  )
}
