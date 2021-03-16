import React, { forwardRef } from 'react'
import { HiInbox } from 'react-icons/hi'
import Tippy from '@tippyjs/react'

export default forwardRef(({ children, className }, ref) => {
  return (
    <header
      ref={ref}
      id="header"
      className={`fixed left-0 lg:left-76 right-0 z-10 top-0 electron:top-5.5 h-12 items-center bg-white dark:bg-gray-750 border-b dark:border-gray-800 shadow flex`}
    >
      {children}

      <div className="ml-auto pr-7">
        <Tippy content="Inbox" placement="bottom">
          <div>
            <HiInbox className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer" />
          </div>
        </Tippy>
      </div>
    </header>
  )
})
