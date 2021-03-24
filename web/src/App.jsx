import React from 'react'
import TitleBar from '@/electron/titlebar/TitleBar'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import Router from '@/Router'
import { Provider as UrqlProvider } from 'urql'
import { urqlClient } from '@/graphql/urqlClient'
import ResponsiveToaster from '@/components/ResponsiveToaster'
import { UserProvider } from '@/components/providers/UserProvider'
import { ContextMenuWrapper } from 'react-context-menu-wrapper'
import PostContextMenu from '@/components/context-menus/PostContextMenu'
import CustomDragLayer from '@/components/CustomDragLayer'
import ContextMenus from '@/components/context-menus/ContextMenus'

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
            <CustomDragLayer />
            <ContextMenus />
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
