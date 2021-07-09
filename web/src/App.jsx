import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import Routes from '@/pages/Routes'
import { ApolloProvider } from '@apollo/client/react'
import ResponsiveToaster from '@/components/ui/ResponsiveToaster'
import CustomDragLayer from '@/components/ui/CustomDragLayer'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import TitleBar from '@/components/ui/electron/titlebar/TitleBar'
import { getOS } from '@/utils/getOS'
import { apolloClient } from '@/graphql/apolloClient'
import ContextMenuProvider from '@/providers/ContextMenuProvider'
import LoginDialog from '@/components/LoginDialog'
import UserDialog from '@/components/user/UserDialog'
import UserProvider from '@/providers/UserProvider'

export default function App() {
  const isMac = getOS() === 'Mac OS'
  const Router = window.electron ? HashRouter : BrowserRouter

  return (
    <ApolloProvider client={apolloClient}>
      <HelmetProvider>
        <Helmet>
          <meta charSet="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/logos/logo_icon.svg" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Comet – All-in-one chat & forums for communities</title>
        </Helmet>

        <UserProvider>
          <Router>
            <ContextMenuProvider>
              <DndProvider
                backend={TouchBackend}
                options={{ enableTouchEvents: false, enableMouseEvents: true }}
              >
                <ResponsiveToaster />
                <CustomDragLayer />
                {window.electron && !isMac && <TitleBar />}
                <LoginDialog />
                <UserDialog />
                <div
                  style={
                    window.electron
                      ? { height: isMac ? '100%' : 'calc(100% - 1.375rem)' }
                      : { height: '100%' }
                  }
                  className="flex"
                >
                  <Routes />
                </div>
              </DndProvider>
            </ContextMenuProvider>
          </Router>
        </UserProvider>
      </HelmetProvider>
    </ApolloProvider>
  )
}
