import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import UserAvatar from '@/components/avatars/UserAvatar'
import Tippy from '@tippyjs/react'
import { IconChat, IconDotsVertical } from '@/lib/Icons'
import { Menu, Transition } from '@headlessui/react'

export default function FriendListItem({ friend }) {
  const { push } = useHistory()
  return (
    <div className="group px-2 dark:hover:bg-gray-725 rounded-lg">
      <Link
        to={`/dm/${friend.id}`}
        className="relative h-16 py-2 flex items-center cursor-pointer group border-t dark:border-gray-700"
      >
        <div className="flex">
          <UserAvatar
            user={friend}
            size={9}
            showOnline
            dotClassName="w-2.5 h-2.5 ring-3 dark:ring-gray-750"
          />
          <div>
            <div className="text-base text-secondary font-medium ml-3">
              {friend.name}
              <span className="hidden group-hover:inline-block text-13 text-tertiary font-medium">
                #{friend.tag}
              </span>
            </div>
            <div className="text-13 text-tertiary font-medium ml-3 leading-5">
              {friend.isOnline ? 'Online' : 'Offline'}
            </div>
          </div>
        </div>

        <Tippy content="Message">
          <div className="ml-auto rounded-full dark:bg-gray-800 dark:group-hover:bg-gray-900 h-9 w-9 flex items-center justify-center">
            <IconChat className="w-5 h-5 text-tertiary" />
          </div>
        </Tippy>

        <Menu>
          {({ open }) => (
            <>
              <Tippy content="More">
                <Menu.Button className="ml-3 rounded-full dark:bg-gray-800 dark:group-hover:bg-gray-900 h-9 w-9 flex items-center justify-center focus:outline-none">
                  <IconDotsVertical className="w-5 h-5 text-tertiary" />
                </Menu.Button>
              </Tippy>

              <Transition
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="py-1 absolute right-0 w-56 mt-4 origin-top-right dark:bg-gray-900 rounded-md shadow-lg outline-none"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? 'dark:bg-gray-800' : ''
                        } flex w-full px-4 py-2 text-13 text-red-500`}
                      >
                        Remove Friend
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </Link>
    </div>
  )
}
