import '@/styles/tailwind.css'
import '@/styles/app.css'
import '@/styles/editor.css'
import '@/styles/index.css'
import '@/styles/modal.css'
import '@/styles/slideout.css'
import '@/styles/tippy.css'
import '@/styles/typography.css'

import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'
import { LayoutTree } from '@moxy/next-layout'
import { ThemeProvider } from '@/components/ui/layout/ThemeContext'
import SEO from '../next-seo.config'
import { DefaultSeo } from 'next-seo'
import ProgressBar from '@/components/ui/layout/ProgressBar'
import ResponsiveToaster from '@/components/ui/layout/ResponsiveToaster'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'core/network/apolloClient'
import Layout from '@/components/ui/layout/Layout'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>CometX – See what's in orbit.</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <link rel="dns-prefetch" to="//rsms.me" />
        <link rel="preconnect" to="https://rsms.me/" crossOrigin="true" />
        <link rel="stylesheet" to="https://rsms.me/inter/inter.css" />
      </Head>

      <DefaultSeo {...SEO} />

      <ProgressBar />

      <ResponsiveToaster />

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ApolloProvider client={apolloClient}>
            <DndProvider backend={HTML5Backend}>
              <ThemeProvider>
                <LayoutTree
                  Component={Component}
                  pageProps={pageProps}
                  defaultLayout={<Layout />}
                />
              </ThemeProvider>
            </DndProvider>
          </ApolloProvider>
        </Hydrate>

        {process.env.NODE_ENV !== 'production' && (
          <ReactQueryDevtools position="bottom-left" />
        )}
      </QueryClientProvider>
    </>
  )
}
