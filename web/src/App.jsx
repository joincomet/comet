import './css/typography.css'
import './css/app.css'
import './css/modal.css'
import './css/slideout.css'
import './css/tippy.css'
import './css/editor.css'

import React from 'react'
// import TitleBar from '@/electron/titlebar/TitleBar'
import { BrowserRouter as Router } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Routes from '@/Routes'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/lib/apolloClient'
import ResponsiveToaster from '@/components/ui/layout/ResponsiveToaster'

export default function App() {
  return (
    <>
      <ResponsiveToaster />
      <ApolloProvider client={apolloClient}>
        <DndProvider backend={HTML5Backend}>
          <Router>
            {/*{window.electron && <TitleBar />}*/}
            <div className={`h-full electron:pt-5.5`}>
              <Routes />
            </div>
          </Router>
        </DndProvider>
      </ApolloProvider>
    </>
  )
}
