import './css/typography.css'
import './css/app.css'
import './css/modal.css'
import './css/slideout.css'
import './css/tippy.css'
import './css/editor.css'

import React from 'react'
import TitleBar from '@/electron/titlebar/TitleBar'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ReactQueryDevtools } from 'react-query/devtools'
import Routes from '@/Routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
      // staleTime: Infinity
    }
  }
})

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DndProvider backend={HTML5Backend}>
          <Router>
            {window.electron && <TitleBar />}
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
