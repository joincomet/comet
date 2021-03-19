import ServerInfoCard from '@/components/server/ServerInfoCard'
import React from 'react'
import Popup from '@/components/popups/base/Popup'

export default function ServerPopup({ server, children }) {
  return (
    <Popup
      className="w-96"
      render={
        <ServerInfoCard
          server={server}
          shadow
          className="rounded-b-none lg:rounded-b-lg"
        />
      }
    >
      {children}
    </Popup>
  )
}
