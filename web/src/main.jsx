import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import './locales/i18n'

import './styles/index.css'
import './styles/app.css'
import './styles/tippy.css'

import App from './App'

if (window.electron) document.documentElement.classList.add('electron')

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
