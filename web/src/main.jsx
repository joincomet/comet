import ReactDOM from 'react-dom'

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
    ReactDOM.render(<GraphiQL />, document.getElementById('root'))
  })
} else {
  ReactDOM.render(<App />, document.getElementById('root'))
}
