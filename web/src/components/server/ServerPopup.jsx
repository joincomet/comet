import ServerInfoCard from '@/components/server/ServerInfoCard'

import Popup from '@/components/ui/Popup'

export default function ServerPopup({ server, children }) {
  return (
    <Popup
      className="w-96"
      render={close => (
        <ServerInfoCard
          server={server}
          shadow
          className="rounded-b-none lg:rounded-b-lg"
        />
      )}
    >
      {children}
    </Popup>
  )
}
