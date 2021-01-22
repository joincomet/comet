import React, { forwardRef } from 'react'
import { FiMenu } from 'react-icons/fi'
import { HiHome, HiInbox } from 'react-icons/hi'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { useNotifications } from '@/lib/queries/useNotifications'
import NavLink from '@/components/NavLink'

const menuBtn =
  'mr-3 block md:hidden inline-flex flex-shrink-0 items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-750 transition'

export default forwardRef(
  ({ children, className, slideoutLeft, title = 'Home' }, ref) => {
    const currentUser = useCurrentUser().data
    const notifications = useNotifications({ unreadOnly: true }).data

    return (
      <header
        ref={ref}
        id="header"
        className={`flex fixed left-0 md:left-76 right-0 md:right-60 top-0 h-12 z-10 items-center px-3 bg-white dark:bg-gray-800`}
      >
        <div className={menuBtn} onClick={() => slideoutLeft.toggle()}>
          <FiMenu size={20} />
        </div>

        <div className="text-lg md:text-sm inline-flex items-center font-semibold md:font-medium whitespace-nowrap truncate text-secondary">
          {title}
        </div>

        <div className="ml-auto">
          {currentUser && (
            <div className="flex items-center space-x-6">
              <NavLink
                href="/notifications"
                className="hidden md:block relative p-3 rounded-full transition bg-transparent dark:hover:bg-gray-700 cursor-pointer"
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
        </div>
      </header>
    )
  }
)
