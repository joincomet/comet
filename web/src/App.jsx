import './css/typography.css'
import './css/app.css'
import './css/modal.css'
import './css/slideout.css'
import './css/tippy.css'
import './css/editor.css'

import React, { useState } from 'react'
import TitleBar from '@/electron/titlebar/TitleBar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import PlanetScroller from '@/components/planet-scroller/PlanetScroller'
import HomePage from '@/pages/HomePage'
import { QueryClient, QueryClientProvider } from 'react-query'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ReactQueryDevtools } from 'react-query/devtools'
import ExplorePage from '@/pages/ExplorePage'
import { useCurrentUser } from '@comet/core/queries/useCurrentUser'
import LandingPage from '@/pages/LandingPage'

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
            <div className={`h-full electron:pt-5.5`}>
              <Routes />
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

function PrivateRoute({ children, ...rest }) {
  const user = useCurrentUser().data
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

function Routes() {
  const user = useCurrentUser().data
  return (
    <Switch>
      <Route
        path="/"
        render={() => {
          if (user) return <Redirect to="/home" />
          if (window.electron) {
            return <Redirect to="/login" />
          } else {
            return <LandingPage />
          }
        }}
      />
      <Route path="/home">
        <HomePage />
      </Route>
      <Route path="/explore">
        <ExplorePage />
      </Route>
    </Switch>
  )
}
