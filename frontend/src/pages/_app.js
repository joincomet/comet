import 'tippy.js/dist/tippy.css'
import 'overlayscrollbars/css/OverlayScrollbars.css'
import 'react-virtualized/styles.css'
import '@/styles/tailwind.css'
import '@/styles/app.css'

import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@/lib/apolloClient'
import LoginDialog from '@/components/LoginDialog'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <link rel="dns-prefetch" href="//rsms.me" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        />
      </Head>

      <div>
        <LoginDialog />
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  )
}
