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
import UserAvatar from '@/components/user/UserAvatar'
import { IconBell, IconFolder, IconSearch } from '@/components/ui/icons/Icons'

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
              <ResponsiveToaster />
              <CustomDragLayer />
              {window.electron && !isMac && <TitleBar />}
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

              {/*<div className="fixed inset-x-0 bottom-4 h-0.5 bg-gradient-to-r from-red-400 to-blue-500" />*/}
              <div className="flex items-center px-5 fixed right-0 left-18 bottom-0 h-5.5 bg-gray-650">
                <UserAvatar size={4} className="dark:bg-gray-500 mr-2" />
                <div className="text-white text-13 font-medium">Dan</div>
                <div className="w-2 h-2 rounded-full bg-green-500 ml-1" />
                <div className="ml-auto flex items-center space-x-3 text-primary">
                  <IconSearch className="w-4 h-4" />
                  <IconFolder className="w-4 h-4" />
                  <IconBell className="w-4 h-4" />
                </div>
              </div>
            </DndProvider>
          </ContextMenuProvider>
        </AppRouter>
      </HelmetProvider>
    </ApolloProvider>
  )
}
