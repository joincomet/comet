import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import Routes from '@/pages/Routes'
import { ApolloProvider } from '@apollo/client/react'
import ResponsiveToaster from '@/components/ui/ResponsiveToaster'
import CustomDragLayer from '@/components/ui/CustomDragLayer'
import { Router } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import TitleBar from '@/components/ui/electron/titlebar/TitleBar'
import { getOS } from '@/utils/getOS'
import { apolloClient } from '@/graphql/apolloClient'
import ContextMenuProvider from '@/providers/ContextMenuProvider'
import MobileComingSoon from '@/components/ui/MobileComingSoon'
import LoginDialog from '@/components/LoginDialog'
import UserDialog from '@/components/user/UserDialog'
import * as Sentry from '@sentry/react'

function App({ history }) {
  const isMac = getOS() === 'Mac OS'

  return (
    <ApolloProvider client={apolloClient}>
      <HelmetProvider>
        <Helmet titleTemplate="%s – Comet">
          <meta charSet="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/logos/logo_icon.svg" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Helmet>

        <Router history={history}>
          <ContextMenuProvider>
            <DndProvider
              backend={TouchBackend}
              options={{ enableTouchEvents: false, enableMouseEvents: true }}
            >
              <MobileComingSoon />

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
                className="hidden lg:flex"
              >
                <Routes />
              </div>
            </DndProvider>
          </ContextMenuProvider>
        </Router>
      </HelmetProvider>
    </ApolloProvider>
  )
}

export default Sentry.withProfiler(App)
