import Router from 'next/router'
import NProgress from 'nprogress'
import React, { useEffect, useRef, useState } from 'react'
import { useHeaderStore } from '@/lib/stores/useHeaderStore'

const DELAY = 200

export default function ProgressBar() {
  const [isLoading, setLoading] = useState(false)

  const { setCanGoBack } = useHeaderStore()

  const timeout = useRef(null)

  useEffect(() => {
    Router.events.on('routeChangeStart', url => {
      NProgress.start()
      timeout.current = setTimeout(() => {
        setLoading(true)
      }, DELAY)
    })
    Router.events.on('routeChangeComplete', () => {
      NProgress.done()
      clearTimeout(timeout.current)
      setLoading(false)
      setCanGoBack(true)
    })
    Router.events.on('routeChangeError', () => {
      NProgress.done()
      clearTimeout(timeout.current)
      setLoading(false)
    })

    return () => {
      clearTimeout(timeout.current)
    }
  }, [])

  return (
    <span
      className={`fixed bg-blue-100 top-0 left-0 right-0 block h-0.5 w-full transform origin-top-left ${
        isLoading ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
      }`}
      style={{
        zIndex: 100,
        boxShadow: '0 0 8px #fff',
        transition: isLoading
          ? 'transform 600ms ease-out'
          : 'opacity 100ms ease-out, transform 0ms linear 100ms'
      }}
    />
  )
}
