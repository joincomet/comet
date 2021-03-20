import React from 'react'
import ReactDOM from 'react-dom'

import './css/index.css'
import './css/app.css'
import './css/tippy.css'
import './css/editor.css'

import App from './App'

if (window.electron) document.documentElement.classList.add('electron')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
