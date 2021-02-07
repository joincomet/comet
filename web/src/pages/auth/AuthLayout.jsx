import React from 'react'
import Logo from '@/components/ui/icons/Logo'
import Grass from '@/components/graphics/Grass'
import Telescope from '@/components/graphics/Telescope'
import Meteors from '@/components/graphics/Meteors'
import { Link } from 'react-router-dom'

const logo = <Logo className="absolute left-8 top-8 h-6" />

export default function AuthLayout({ children }) {
  return (
    <div
      className="h-full flex items-center justify-center relative"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at top , #18181B 0%,  #27272A 95%)'
      }}
    >
      {children}

      {window.electron ? logo : <Link to="/">{logo}</Link>}

      <div className="flex absolute bottom-0 left-0 right-0 z-10 text-gray-900">
        <Grass className="w-1/2" />
        <Grass className="w-1/2" />
      </div>
      <Telescope className="absolute bottom-0 right-32 text-gray-900 z-10 h-96" />
      <Meteors />
    </div>
  )
}
