import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import './i18n/i18n'

import './css/index.css'
import './css/app.css'
import './css/tippy.css'
import './css/editor.css'

import App from './App'

if (window.electron) document.documentElement.classList.add('electron')

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
