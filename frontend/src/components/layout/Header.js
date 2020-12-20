import React from 'react'
import { FiSearch, FiBell } from 'react-icons/fi'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import UserAvatar from '@/components/user/UserAvatar'
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

  return (
    <>
      <header
        className={`flex z-50 fixed left-0 lg:left-64 right-0 top-0 h-14 items-center transition px-8 ${
          isDark() ? 'dark:bg-gray-900' : 'bg-transparent'
        }`}
        {...rest}
      >
        <div className="relative text-gray-600 dark:text-gray-400 focus-within:text-blue-500 dark:focus-within:text-blue-500 transition">
          <button className="absolute h-8 w-10 top-1/2 transform -translate-y-1/2 focus:outline-none inline-flex items-center justify-center">
            <FiSearch className="w-4 h-4" />
          </button>
          <input className="h-8 text-sm rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none text-primary px-10 w-48" />
        </div>

        <div className="ml-auto">
          {currentUser ? (
            <div className="flex items-center space-x-6">
              <div className="p-3 rounded-full transition bg-transparent dark:hover:bg-gray-700 cursor-pointer">
                <FiBell className="w-5 h-5" />
              </div>

              <UserOptionsDropdown />
            </div>
          ) : (
            <div
              onClick={() => openLogin()}
              className="h-9 text-sm font-medium cursor-pointer px-6 bg-gray-900 bg-opacity-25 rounded-full inline-flex items-center"
            >
              Log In / Sign Up
            </div>
          )}
        </div>
      </header>
    </>
  )
}
