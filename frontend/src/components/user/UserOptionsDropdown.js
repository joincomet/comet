// @refresh reset
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import React from 'react'
import UserAvatar from '@/components/user/UserAvatar'
import NavLink from '@/components/NavLink'
import { useLogoutMutation } from '@/lib/mutations/authMutations'
import { useQueryClient } from 'react-query'
import ToggleTheme from '@/components/ToggleTheme'
import { Menu, Transition } from '@headlessui/react'
import { FiUser, FiSettings, FiLogOut, FiMoon, FiSun } from 'react-icons/fi'
import { menuTransition } from '@/lib/menuTransition'
import { useTheme } from '@/components/ThemeContext'

export default function UserOptionsDropdown() {
  const currentUser = useCurrentUser().data

  const queryClient = useQueryClient()

  const logoutMutation = useLogoutMutation()
  const logout = async () => {
    await logoutMutation.mutateAsync({})
    await queryClient.invalidateQueries()
  }

  const { theme, toggleTheme } = useTheme()

  const menuItem =
    'cursor-pointer transition flex items-center w-full px-4 py-2.5 text-sm font-medium focus:outline-none select-none hover:bg-gray-100 dark:hover:bg-gray-700'

  return (
    <div className="relative z-50 h-14">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="inline-flex flex-nowrap items-center cursor-pointer select-none focus:outline-none h-full">
              <UserAvatar user={currentUser} className="h-9 w-9" />
              <div className="ml-4 font-medium text-sm">{currentUser.name}</div>
            </Menu.Button>

            <Transition show={open} {...menuTransition}>
              <Menu.Items
                static
                className="absolute right-0 mt-1 w-56 origin-top-right bg-white border border-gray-200 dark:border-transparent dark:bg-gray-800 rounded-md shadow-lg outline-none"
              >
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      href={`/user/${currentUser.username}`}
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } ${menuItem}`}
                    >
                      <FiUser size={18} className="mr-4" />
                      My Profile
                    </NavLink>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={toggleTheme}
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } ${menuItem}`}
                    >
                      {theme === 'light' ? (
                        <FiMoon size={18} className="mr-4" />
                      ) : (
                        <FiSun size={18} className="mr-4" />
                      )}
                      {theme === 'light' ? 'Dark' : 'Light'} Mode
                    </div>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      href="/settings"
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } ${menuItem}`}
                    >
                      <FiSettings size={18} className="mr-4" />
                      Settings
                    </NavLink>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => logout()}
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } ${menuItem}`}
                    >
                      <FiLogOut size={18} className="mr-4" />
                      Log Out
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}
