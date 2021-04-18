import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
/*import { EventSourcePolyfill } from 'event-source-polyfill'
window.EventSource = EventSourcePolyfill*/

import './locales/i18n'

import './styles/index.css'
import './styles/app.css'
import './styles/tippy.css'

import App from './App'

if (window.electron) document.documentElement.classList.add('electron')

if (
  process.env.NODE_ENV === 'development' &&
  window.location.pathname === '/__dev__/graphiql'
) {
  import('./dev/GraphiQL').then(({ GraphiQL }) => {
    ReactDOM.render(
      <StrictMode>
        <GraphiQL />
      </StrictMode>,
      document.getElementById('root')
    )
  })
} else {
  ReactDOM.render(
    <StrictMode>
      <App />
    </StrictMode>,
    document.getElementById('root')
  )
}
