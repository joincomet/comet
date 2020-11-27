import 'tippy.js/dist/tippy.css'
import '@/styles/tailwind.css'
import '@/styles/app.css'

import Head from 'next/head'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import CustomDragLayer from '@/components/CustomDragLayer'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query-devtools'
import { Provider } from 'next-auth/client'

const queryClient = new QueryClient({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>CometX – See what's in orbit.</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <link rel="dns-prefetch" href="//rsms.me" />
        <link rel="preconnect" href="https://rsms.me/" crossOrigin="true" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com/"
          crossOrigin="true"
        />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        />
      </Head>

      <Provider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <DndProvider
              backend={TouchBackend}
              options={{ enableTouchEvents: false, enableMouseEvents: true }}
            >
              <Component {...pageProps} />
              <CustomDragLayer />
            </DndProvider>
          </Hydrate>

          {process.env.NODE_ENV !== 'production' && (<ReactQueryDevtools position="top-left" />)}
        </QueryClientProvider>
      </Provider>
    </>
  )
}
