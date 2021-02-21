import PlanetInfoCard from '@/components/planet/PlanetInfoCard'
import React from 'react'
import Popup from '@/components/ui/Popup'

export default function PlanetPopup({ planet, children }) {
  return (
    <Popup
      className="w-96"
      render={
        <PlanetInfoCard
          planet={planet}
          shadow
          className="rounded-b-none lg:rounded-b-lg"
        />
      }
    >
      {children}
    </Popup>
  )
}
