import 'tippy.js/dist/tippy.css'
import 'react-responsive-modal/styles.css'
import '@/styles/tailwind.css'
import '@/styles/app.css'

import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'
import { LayoutTree } from '@moxy/next-layout'
import { ThemeProvider } from '@/components/ThemeContext'
import Layout from '@/components/layout/Layout'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity
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
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <LayoutTree
              Component={Component}
              pageProps={pageProps}
              defaultLayout={<Layout />}
            />
          </Hydrate>

          {process.env.NODE_ENV !== 'production' && (
            <ReactQueryDevtools position="bottom-left" />
          )}
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}
