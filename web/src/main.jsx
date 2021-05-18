import ReactDOM from 'react-dom'

import './locales/i18n'

import './styles/index.css'
import './styles/app.css'
import './styles/tippy.css'

import { createBrowserHistory } from 'history'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import App from './App'
import { version } from '../package.json'

const history = createBrowserHistory()

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV5Instrumentation(history)
    })
  ],
  release: `web@${version}`,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  enabled: import.meta.PROD && import.meta.env.VITE_SENTRY_DSN
})

if (window.electron) document.documentElement.classList.add('electron')

if (
  process.env.NODE_ENV === 'development' &&
  window.location.pathname === '/__dev__/graphiql'
) {
  import('./dev/GraphiQL').then(({ GraphiQL }) => {
    ReactDOM.render(<GraphiQL />, document.getElementById('root'))
  })
} else {
  ReactDOM.render(<App history={history} />, document.getElementById('root'))
}
