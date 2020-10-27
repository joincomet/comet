import 'tippy.js/dist/tippy.css'
import 'overlayscrollbars/css/OverlayScrollbars.css'
import 'react-virtualized/styles.css'
import '@/styles/tailwind.css'
import '@/styles/app.css'

import Head from 'next/head'
import LoginDialog from '@/components/LoginDialog'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import { CustomDragLayer } from '@/components/CustomDragLayer'
import { ReactQueryCacheProvider, QueryCache } from 'react-query'
import { dehydrate, Hydrate } from 'react-query/hydration'
import App from 'next/app'
import { ReactQueryDevtools } from 'react-query-devtools'
import { fetchCurrentUser } from '@/hooks/useCurrentUser'

const queryCache = new QueryCache()

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>CometX – See what's in orbit.</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <link rel="dns-prefetch" href="//rsms.me" />
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

      <ReactQueryCacheProvider queryCache={queryCache}>
        <Hydrate state={pageProps.dehydratedState}>
          <DndProvider
            backend={TouchBackend}
            options={{ enableTouchEvents: false, enableMouseEvents: true }}
          >
            <div>
              <LoginDialog />
              <Component {...pageProps} />
              <CustomDragLayer />
            </div>
          </DndProvider>
        </Hydrate>

        <ReactQueryDevtools initialIsOpen />
      </ReactQueryCacheProvider>
    </>
  )
}

MyApp.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)

  const queryCache = new QueryCache()
  await queryCache.prefetchQuery(['currentUser'], fetchCurrentUser)

  return {
    ...appProps,
    props: {
      dehydratedState: dehydrate(queryCache)
    }
  }
}

export default MyApp
