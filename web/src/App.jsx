import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import Routes from '@/Routes'
import { Provider as UrqlProvider } from 'urql'
import { urqlClient } from '@/graphql/urqlClient'
import ResponsiveToaster from '@/components/ResponsiveToaster'
import { DataProvider } from '@/components/providers/DataProvider'
import CustomDragLayer from '@/components/CustomDragLayer'
import ContextMenus from '@/components/context-menus/ContextMenus'
import { BrowserRouter } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <UrqlProvider value={urqlClient}>
        <DataProvider>
          <DndProvider
            backend={TouchBackend}
            options={{ enableTouchEvents: false, enableMouseEvents: true }}
          >
            <ResponsiveToaster />
            <CustomDragLayer />
            <ContextMenus />
            <div className={`h-full max-h-full`}>
              <Routes />
            </div>
          </DndProvider>
        </DataProvider>
      </UrqlProvider>
    </BrowserRouter>
  )
}
