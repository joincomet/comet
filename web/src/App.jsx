import React from 'react'
import TitleBar from '@/electron/titlebar/TitleBar'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import Router from '@/Router'
import { Provider as UrqlProvider } from 'urql'
import { urqlClient } from '@/graphql/urqlClient'
import ResponsiveToaster from '@/components/ResponsiveToaster'
import { UserProvider } from '@/components/providers/UserProvider'

export default function App() {
  return (
    <>
      <ResponsiveToaster />
      <UrqlProvider value={urqlClient}>
        <UserProvider>
          <DndProvider
            backend={TouchBackend}
            options={{ enableTouchEvents: false, enableMouseEvents: true }}
          >
            {window.electron && <TitleBar />}
            <div className={`h-full max-h-full electron:pt-5.5`}>
              <Router />
            </div>
          </DndProvider>
        </UserProvider>
      </UrqlProvider>
    </>
  )
}
