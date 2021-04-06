import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import Routes from '@/pages/Routes'
import { Provider as UrqlProvider } from 'urql'
import { urqlClient } from '@/graphql/urqlClient'
import ResponsiveToaster from '@/components/ui/ResponsiveToaster'
import CustomDragLayer from '@/components/ui/CustomDragLayer'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { UserProvider } from '@/providers/UserProvider'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import TitleBar from '@/components/ui/electron/titlebar/TitleBar'
import { getOS } from '@/utils/getOS'

export default function App() {
  const AppRouter = window.electron ? HashRouter : BrowserRouter

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/logos/logo_icon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Comet – All-in-one chat and forums for communities.</title>
      </Helmet>

      <AppRouter>
        <UrqlProvider value={urqlClient}>
          <UserProvider>
            <DndProvider
              backend={TouchBackend}
              options={{ enableTouchEvents: false, enableMouseEvents: true }}
            >
              <ResponsiveToaster />
              <CustomDragLayer />
              {window.electron && getOS() !== 'Mac OS' && <TitleBar />}
              <div
                style={
                  window.electron
                    ? { height: 'calc(100% - 1.375rem)' }
                    : { height: '100%' }
                }
                className="flex"
              >
                <Routes />
              </div>
            </DndProvider>
          </UserProvider>
        </UrqlProvider>
      </AppRouter>
    </HelmetProvider>
  )
}
