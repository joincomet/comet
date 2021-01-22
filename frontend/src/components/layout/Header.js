import React, { forwardRef, useState } from 'react'
import {
  FiSearch,
  FiBell,
  FiMenu,
  FiLogIn,
  FiArrowLeft,
  FiHome
} from 'react-icons/fi'
import { HiHome, HiBell, HiInbox } from 'react-icons/hi'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { useHeaderStore } from '@/lib/stores/useHeaderStore'
import { useRouter } from 'next/router'
import { useLoginStore } from '@/lib/stores/useLoginStore'
import UserOptionsDropdown from '@/components/user/UserOptionsDropdown'
import { useNotifications } from '@/lib/queries/useNotifications'
import NavLink from '@/components/NavLink'
import Logo from '@/components/Logo'

const menuBtn =
  'mr-3 block md:hidden inline-flex flex-shrink-0 items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-750 transition'

export default forwardRef(({ children, className, slideoutLeft }, ref) => {
  const currentUser = useCurrentUser().data
  const notifications = useNotifications({ unreadOnly: true }).data
  const { setLogin } = useLoginStore()

  const { dark, setSidebar, sidebar, title, canGoBack } = useHeaderStore()

  const [search, setSearch] = useState('')

  const { query, pathname, push, back } = useRouter()

  return (
    <header
      ref={ref}
      id="header"
      className={`flex fixed left-0 md:left-76 right-0 md:right-60 top-0 h-12 z-10 items-center px-3 bg-white dark:bg-gray-800`}
    >
      <div className={menuBtn} onClick={() => slideoutLeft.toggle()}>
        <FiMenu size={20} />
      </div>

      <div className="text-lg inline-flex items-center font-semibold leading-none whitespace-nowrap truncate text-secondary">
        <HiHome className="w-5 h-5 mr-4" />
        Home
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
})
