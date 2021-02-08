import './css/typography.css'
import './css/app.css'
import './css/slideout.css'
import './css/tippy.css'
import './css/editor.css'

import React from 'react'
import TitleBar from '@/electron/titlebar/TitleBar'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Router from '@/Router'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '@/lib/apolloClient'
import ResponsiveToaster from '@/components/ui/layout/ResponsiveToaster'

export default function App() {
  return (
    <>
      <ResponsiveToaster />
      <ApolloProvider client={apolloClient}>
        <DndProvider backend={HTML5Backend}>
          {window.electron && <TitleBar />}
          <div className={`h-full electron:pt-5.5`}>
            <Router />
          </div>
        </DndProvider>
      </ApolloProvider>
    </>
  )
}
