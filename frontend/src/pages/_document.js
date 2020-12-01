import Document, { Head, Html, Main, NextScript } from 'next/document'

const APP_NAME = 'CometX'
const APP_DESCRIPTION = `See what's in orbit`

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#FFFFFF" />
          {/* TIP: set viewport head meta tag in _app.js, otherwise it will show a warning */}
          {/* <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' /> */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-touch-icon.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/icons/favicon.ico" />

          {/*<script src="https://accounts.google.com/gsi/client" async defer />*/}
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function () {
                function setTheme(newTheme) {
                  document.documentElement.className = newTheme;
                  window.__theme = newTheme;
                  window.__onThemeChange(newTheme);
                }
                window.__onThemeChange = function () {};
                window.__setPreferredTheme = function (newTheme) {
                  setTheme(newTheme);
                  try {
                    localStorage.setItem("theme", JSON.stringify(window.__theme));
                  } catch (err) {}
                };
                const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
                darkQuery.addListener(function (event) {
                  window.__setPreferredTheme(event.matches ? "dark" : "light");
                });
                let preferredTheme;
                try {
                  preferredTheme = JSON.parse(localStorage.getItem("theme"));
                } catch (err) {}
                setTheme(preferredTheme || (darkQuery.matches ? "dark" : "light"));
              })();
            `
            }}
          />

          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
