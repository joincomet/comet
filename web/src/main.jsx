import ReactDOM from 'react-dom'

import './locales/i18n'

import './styles/index.css'
import './styles/app.css'
import './styles/tippy.css'
import './components/tenor/styles.css'

import { createBrowserHistory } from 'history'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import App from './App'
import { version } from '../package.json'
import { excludeGraphQLFetch } from 'apollo-link-sentry';

const history = createBrowserHistory()

if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
        traceFetch: false
      })
    ],
    release: `web@${version}`,
    tracesSampleRate: 1.0,
    beforeBreadcrumb: excludeGraphQLFetch
  })
}

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
