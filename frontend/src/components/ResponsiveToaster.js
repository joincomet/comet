import { useMedia } from 'react-use'
import { Toaster } from 'react-hot-toast'
import React from 'react'

export default function ResponsiveToaster() {
  const small = useMedia('(max-width: 767.99px)')

  return (
    <Toaster
      position={small ? 'bottom-center' : 'bottom-right'}
      toastOptions={{
        className: 'toast',
        success: {
          className: 'toast',
          iconTheme: {
            primary: '#059669'
          }
        },
        error: {
          className: 'toast',
          iconTheme: {
            primary: '#EF4444'
          }
        }
      }}
    />
  )
}
