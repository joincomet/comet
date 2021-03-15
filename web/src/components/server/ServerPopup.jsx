import ServerInfoCard from '@/components/server/ServerInfoCard'
import React from 'react'
import Popup from '@/components/ui/Popup'

export default function ServerPopup({ planet, children }) {
  return (
    <Popup
      className="w-96"
      render={
        <ServerInfoCard
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
