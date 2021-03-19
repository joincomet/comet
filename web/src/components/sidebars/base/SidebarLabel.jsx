import React from 'react'
import Tippy from '@tippyjs/react'
import { IconPlus } from '@/lib/Icons'

export default function SidebarLabel({ children }) {
  return (
    <div className="px-3 pt-4 pb-1.5 text-gray-500 dark:text-gray-500 uppercase text-11 font-semibold tracking-widest flex items-center justify-between">
      {children}
    </div>
  )
}
