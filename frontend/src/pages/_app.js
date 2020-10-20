import '../styles/index.css'
import '../styles/app.css'
import 'overlayscrollbars/css/OverlayScrollbars.css'
import 'react-virtualized/styles.css'

import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import LoginDialog from '../components/LoginDialog'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <div>
        <LoginDialog />
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  )
}
