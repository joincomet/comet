import React from 'react'
import Tippy from '@tippyjs/react'
import { IconPlus } from '@/lib/Icons'

export default function SidebarLabelPlus({ children, plusLabel, onClick }) {
  return (
    <div
      className={`px-3 pt-4 pb-1 text-gray-500 dark:text-gray-500 uppercase text-11 font-semibold tracking-widest flex items-center justify-between hover:text-gray-600 dark:hover:text-gray-400 select-none`}
    >
      {children}
      <Tippy content={plusLabel}>
        <div onClick={onClick}>
          <IconPlus className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer" />
        </div>
      </Tippy>
    </div>
  )
}
