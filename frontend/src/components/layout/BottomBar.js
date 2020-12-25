import { FiHome, FiSearch, FiBell } from 'react-icons/fi'
import React from 'react'
import NavLink from '@/components/NavLink'
import { useNotifications } from '@/lib/queries/useNotifications'
import { useRouter } from 'next/router'

const bottomButton =
  'h-14 w-full inline-flex items-center justify-center cursor-pointer relative'

export default function BottomBar() {
  const notifications = useNotifications({ unreadOnly: true }).data

  const { pathname } = useRouter()

  return (
    <div className="block md:hidden items-center fixed z-10 justify-between text-tertiary bottom-0 left-0 right-0 h-14 bg-white dark:bg-gray-800 shadow-md flex border-t dark:border-gray-700">
      <NavLink href="/" className={bottomButton}>
        <FiHome
          size={20}
          className={`${
            pathname === '/' || pathname === '/universe' ? 'text-accent' : ''
          }`}
        />
      </NavLink>

      <NavLink href="/search" className={bottomButton}>
        <FiSearch
          size={20}
          className={`${pathname === '/search' ? 'text-accent' : ''}`}
        />
      </NavLink>

      <NavLink href="/notifications" className={bottomButton}>
        <div className="relative">
          <FiBell
            size={20}
            className={`${pathname === '/notifications' ? 'text-accent' : ''}`}
          />

          {notifications.length > 0 && (
            <div className="absolute text-white -right-full -bottom-1/2 rounded-full w-6 h-6 inline-flex items-center justify-center tip bg-blue-500">
              {notifications.length}
            </div>
          )}
        </div>
      </NavLink>
    </div>
  )
}
