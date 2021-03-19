import React from 'react'
import { IconSpinner, GraphicLogo } from '@/lib/Icons'

export default function LoadingScreen() {
  return (
    <div className="h-full flex items-center justify-center dark:bg-gray-800">
      <div className="space-y-8">
        <GraphicLogo className="w-36" />
        <div className="flex items-center justify-center">
          <IconSpinner />
        </div>
      </div>
    </div>
  )
}
