import './css/typography.css'
import './css/app.css'
import './css/modal.css'
import './css/slideout.css'
import './css/tippy.css'
import './css/editor.css'

import React, { useState } from 'react'
import TitleBar from '@/electron/titlebar/TitleBar'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import PlanetScroller from '@/components/planet-scroller/PlanetScroller'
import HomePage from '@/pages/HomePage'
import { QueryClient, QueryClientProvider } from 'react-query'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ReactQueryDevtools } from 'react-query/devtools'
import ExplorePage from '@/pages/ExplorePage'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
      // staleTime: Infinity
    }
  }
})

export default function App() {
  if (window.electron) document.documentElement.classList.add('electron')
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DndProvider backend={HTML5Backend}>
          <Router>
            {window.electron && <TitleBar />}
            <PlanetScroller />
            <div className={`h-full ${window.electron ? 'pt-5.5' : ''}`}>
              {/*<PlanetScroller />*/}
              <Switch>
                <Route path="/">
                  <HomePage />
                </Route>
                <Route path="/explore">
                  <ExplorePage />
                </Route>
              </Switch>
            </div>
          </Router>
        </DndProvider>

        {process.env.NODE_ENV !== 'production' && (
          <ReactQueryDevtools position="bottom-left" />
        )}
      </QueryClientProvider>
    </>
  )
}
