import React from 'react'
import { FiSearch, FiBell, FiUser } from 'react-icons/fi'
import NavLink from '@/components/NavLink'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import UserAvatar from '@/components/user/UserAvatar'
import { useHeaderStore, useLoginStore } from '@/lib/stores'
import { useRouter } from 'next/router'

export default function Header({ children, className, ...rest }) {
  const currentUser = useCurrentUser().data

  const { openLoginModal } = useLoginStore()

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
          <FiSearch className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input className="h-8 text-sm rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none text-primary px-10 w-48" />
        </div>

        <div className="ml-auto">
          {currentUser ? (
            <div className="flex items-center space-x-6">
              <div className="p-3 rounded-full transition bg-transparent dark:hover:bg-gray-700 cursor-pointer">
                <FiBell className="w-5 h-5" />
              </div>

              <div className="inline-flex items-center">
                <UserAvatar user={currentUser} />
                <div className="ml-3 text-sm">{currentUser.name}</div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => openLoginModal()}
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
