import React, { useState } from 'react'
import { FiSearch, FiBell, FiMenu, FiLogIn } from 'react-icons/fi'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { useHeaderStore } from '@/lib/stores/useHeaderStore'
import { useRouter } from 'next/router'
import { useLoginStore } from '@/lib/stores/useLoginStore'
import UserOptionsDropdown from '@/components/user/UserOptionsDropdown'
import { useNotifications } from '@/lib/queries/useNotifications'
import NavLink from '@/components/NavLink'

export default function Header({ children, className, ...rest }) {
  const currentUser = useCurrentUser().data
  const notifications = useNotifications({ unreadOnly: true }).data
  const { setLogin } = useLoginStore()

  const { dark, setSidebar, sidebar, title } = useHeaderStore()

  const [search, setSearch] = useState('')

  const { query, pathname, push } = useRouter()

  const routes = ['/planet/[planetname]', '/user/[username]']

  const isDark = routes.includes(pathname) ? dark : true

  const isSolo = !routes.includes(pathname)

  return (
    <>
      <header
        className={`flex z-50 fixed left-0 md:left-64 right-0 top-0 h-14 items-center transition px-4 md:px-8 ${
          isDark ? 'bg-white dark:bg-gray-900' : 'bg-transparent'
        } ${isSolo ? 'border-b border-gray-200 dark:border-transparent' : ''}`}
        {...rest}
      >
        <div
          onClick={() => setSidebar(!sidebar)}
          className="block md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          <FiMenu size={20} />
        </div>

        <div className="header-3 ml-4 block md:hidden whitespace-nowrap truncate">
          {title}
        </div>

        <div className="hidden md:block relative text-gray-600 dark:text-gray-400 focus-within:text-blue-500 dark:focus-within:text-blue-500 transition">
          <button className="absolute h-8 w-10 top-1/2 transform -translate-y-1/2 focus:outline-none inline-flex items-center justify-center">
            <FiSearch className="w-4 h-4" />
          </button>
          <input
            onKeyDown={e => {
              if (e.key === 'Enter') push(`/search?q=${search}`)
            }}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-8 text-sm rounded-full bg-gray-200 dark:bg-gray-800 focus:outline-none text-primary px-10 w-64"
          />
        </div>

        <div className="ml-auto">
          {currentUser ? (
            <div className="flex items-center space-x-6">
              <NavLink
                href="/notifications"
                className="hidden md:block relative p-3 rounded-full transition bg-transparent dark:hover:bg-gray-700 cursor-pointer"
              >
                <FiBell size={20} />
                {notifications && notifications.length > 0 && (
                  <div className="absolute -bottom-0.5 -right-0.5 rounded-full w-6 h-6 inline-flex items-center justify-center tip bg-blue-500">
                    {notifications.length}
                  </div>
                )}
              </NavLink>

              <UserOptionsDropdown />
            </div>
          ) : (
            <div
              onClick={() => setLogin(true)}
              className={`h-9 font-medium text-sm cursor-pointer text-secondary whitespace-nowrap select-none inline-flex items-center`}
            >
              Log In / Sign Up
              <FiLogIn size={20} className="ml-3" />
            </div>
          )}
        </div>
      </header>
    </>
  )
}
