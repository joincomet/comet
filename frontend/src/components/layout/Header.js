import React from 'react'
import { FiSearch, FiBell, FiMenu, FiLogIn } from 'react-icons/fi'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { useHeaderStore } from '@/lib/stores'
import { useRouter } from 'next/router'
import { useLogin } from '@/lib/useLogin'
import UserOptionsDropdown from '@/components/user/UserOptionsDropdown'

export default function Header({ children, className, ...rest }) {
  const currentUser = useCurrentUser().data
  const { openLogin } = useLogin()

  const { dark } = useHeaderStore()

  const router = useRouter()

  const routes = ['/planet/[planetname]', '/user/[username]']

  const isDark = () => (routes.includes(router.pathname) ? dark : true)

  const isSolo = () => !routes.includes(router.pathname)

  return (
    <>
      <header
        className={`flex z-50 fixed left-0 lg:left-64 right-0 top-0 h-14 items-center transition px-4 md:px-8 ${
          isDark() ? 'bg-white dark:bg-gray-900' : 'bg-transparent'
        } ${
          isSolo() ? 'border-b border-gray-200 dark:border-transparent' : ''
        }`}
        {...rest}
      >
        <div className="block md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
          <FiMenu size={20} />
        </div>

        <div className="hidden md:block relative text-gray-600 dark:text-gray-400 focus-within:text-blue-500 dark:focus-within:text-blue-500 transition">
          <button className="absolute h-8 w-10 top-1/2 transform -translate-y-1/2 focus:outline-none inline-flex items-center justify-center">
            <FiSearch className="w-4 h-4" />
          </button>
          <input className="h-8 text-sm rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none text-primary px-10 w-48" />
        </div>

        <div className="ml-auto">
          {currentUser ? (
            <div className="flex items-center space-x-6">
              <div className="hidden md:block p-3 rounded-full transition bg-transparent dark:hover:bg-gray-700 cursor-pointer">
                <FiBell className="w-5 h-5" />
              </div>

              <UserOptionsDropdown />
            </div>
          ) : (
            <div
              onClick={() => openLogin()}
              className={`h-9 font-medium text-sm cursor-pointer text-accent px-6 rounded-full inline-flex whitespace-nowrap items-center select-none ${
                isDark() ? '' : 'bg-black bg-opacity-25'
              }`}
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
