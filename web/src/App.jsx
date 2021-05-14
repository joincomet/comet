import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import Routes from '@/pages/Routes'
import { ApolloProvider } from '@apollo/client/react'
import ResponsiveToaster from '@/components/ui/ResponsiveToaster'
import CustomDragLayer from '@/components/ui/CustomDragLayer'
import { BrowserRouter, HashRouter, Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import TitleBar from '@/components/ui/electron/titlebar/TitleBar'
import { getOS } from '@/utils/getOS'
import { apolloClient } from '@/graphql/apolloClient'
import ContextMenuProvider from '@/providers/ContextMenuProvider'
import { VectorLogo } from '@/components/ui/vectors'
import {
  IconDiscord,
  IconGithub,
  IconTwitter
} from '@/components/ui/icons/Icons'
import { Meteors } from '@/components/ui/meteors'
import MobileComingSoon from '@/components/ui/MobileComingSoon'

export default function App() {
  const AppRouter = window.electron ? HashRouter : BrowserRouter
  const isMac = getOS() === 'Mac OS'

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
          <title>Comet – All-in-one chat and forums for communities.</title>
        </Helmet>

        <AppRouter>
          <ContextMenuProvider>
            <DndProvider
              backend={TouchBackend}
              options={{ enableTouchEvents: false, enableMouseEvents: true }}
            >
              <MobileComingSoon />

              <ResponsiveToaster />
              <CustomDragLayer />
              {window.electron && !isMac && <TitleBar />}
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
        </AppRouter>
      </HelmetProvider>
    </ApolloProvider>
  )
}
