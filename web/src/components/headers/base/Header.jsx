import React, { forwardRef } from 'react'
import SearchBar from '@/components/SearchBar'

export default forwardRef(
  ({ children, className, icon, title, showDivider = false }, ref) => {
    return (
      <header
        ref={ref}
        id="header"
        className={`fixed left-76 right-0 z-10 top-0 electron:top-5.5 h-12 items-center bg-white dark:bg-gray-750 border-b dark:border-gray-800 shadow flex`}
      >
        <div
          className={`flex items-center font-semibold text-base text-primary pl-6 pr-4 ${
            showDivider ? 'border-r dark:border-gray-700 mr-4' : ''
          }`}
        >
          <div className="text-tertiary mr-3">{icon}</div>
          {title}
        </div>
        <div className="flex-grow flex items-center min-w-0 pr-4">
          {children}
        </div>
        <div className="flex w-60 min-w-[15rem] pr-4">
          <SearchBar />
        </div>
      </header>
    )
  }
)
