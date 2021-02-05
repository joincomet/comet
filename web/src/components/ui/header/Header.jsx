import React, { forwardRef } from 'react'
import { HiMenu, HiPlusCircle } from 'react-icons/hi'
import Tippy from '@tippyjs/react'

export default forwardRef(({ children, className }, ref) => {
  return (
    <header
      ref={ref}
      id="header"
      className={`fixed left-0 lg:left-76 right-0 z-10 top-0 electron:top-5.5 h-12 items-center bg-white dark:bg-gray-750 border-b dark:border-gray-800 shadow flex`}
    >
      {children}
    </header>
  )
})
