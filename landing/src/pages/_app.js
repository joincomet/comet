import 'tippy.js/dist/tippy.css'
import '@/styles/tailwind.css'
import '@/styles/app.css'
import '@/styles/Meteors.scss'
import Head from 'next/head'

function App({ Component, pageProps }) {
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

      <Component {...pageProps} />
    </>
  )
}

export default App
