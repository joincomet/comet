// @refresh reset
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import React from 'react'
import UserAvatar from '@/components/user/UserAvatar'
import NavLink from '@/components/NavLink'
import { useLogoutMutation } from '@/lib/mutations/authMutations'
import { useQueryClient } from 'react-query'
import ToggleTheme from '@/components/ToggleTheme'
import { Menu, Transition } from '@headlessui/react'
import { FiMoreHorizontal } from 'react-icons/fi'
import { menuTransition } from '@/lib/menuTransition'

const item =
  'transition hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer px-4 h-10 flex items-center text-sm text-secondary'

export default function UserOptionsDropdown() {
  const currentUser = useCurrentUser().data

  const queryClient = useQueryClient()

  const logoutMutation = useLogoutMutation()
  const logout = async () => {
    await logoutMutation.mutateAsync({})
    await queryClient.invalidateQueries()
  }

  const menuItem =
    'cursor-pointer transition flex justify-between w-full px-4 py-2 text-sm leading-5 text-left focus:outline-none'

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
                className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 dark:border-transparent dark:bg-gray-800 rounded-md shadow-lg outline-none"
              >
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      href={`/user/${currentUser.username}`}
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } ${menuItem}`}
                    >
                      My Profile
                    </NavLink>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <ToggleTheme
                      className={`${
                        active ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } ${menuItem}`}
                    />
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
