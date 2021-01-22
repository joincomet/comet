import React, { forwardRef } from 'react'
import { HiMenu, HiPlusCircle } from 'react-icons/hi'
import Tippy from '@tippyjs/react'

const menuBtn =
  'block lg:hidden inline-flex flex-shrink-0 items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-750 transition'

export default forwardRef(
  (
    {
      children,
      className,
      slideoutLeft,
      title = '',
      rightSidebarIcon,
      slideoutRight,
      mobileOnly = false
    },
    ref
  ) => {
    return (
      <header
        ref={ref}
        id="header"
        className={`fixed left-0 lg:left-76 right-0 top-0 h-12 z-10 items-center px-1 bg-white dark:bg-gray-800 ${
          mobileOnly ? 'flex lg:hidden' : 'flex'
        }`}
      >
        <div
          className={`mr-1 ${menuBtn}`}
          onClick={e => {
            slideoutLeft.toggle()
            e.stopPropagation()
            e.preventDefault()
          }}
        >
          <HiMenu className="w-5 h-5" />
        </div>

        {title && (
          <div className="text-base inline-flex items-center font-bold whitespace-nowrap truncate text-secondary">
            {title}
          </div>
        )}

        <div className="pl-3 ml-auto">
          <Tippy content="New Post">
            <div className="text-gray-800 dark:text-gray-200 dark:hover:text-white hover:text-black cursor-pointer">
              <HiPlusCircle className="h-5 w-5" />
            </div>
          </Tippy>
        </div>

        {rightSidebarIcon && slideoutRight && (
          <div
            className={`ml-3 text-tertiary ${menuBtn}`}
            onClick={e => {
              slideoutRight.toggle()
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            {rightSidebarIcon}
          </div>
        )}

        {/*<div className="ml-auto">
          {currentUser && (
            <div className="flex items-center space-x-6">
              <NavLink
                href="/notifications"
                className="hidden lg:block relative p-3 rounded-full transition bg-transparent dark:hover:bg-gray-700 cursor-pointer"
              >
                <HiInbox className="w-5 h-5 text-secondary" />
                {notifications && notifications.length > 0 && (
                  <div className="absolute -bottom-0.5 -right-0.5 rounded-full w-6 h-6 inline-flex items-center justify-center tip bg-blue-500">
                    {notifications.length}
                  </div>
                )}
              </NavLink>
            </div>
          )}
        </div>*/}
      </header>
    )
  }
)
