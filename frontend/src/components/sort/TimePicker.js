import React from 'react'
import { useRouter } from 'next/router'
import { FiChevronDown } from 'react-icons/fi'
import NavLink from '@/components/NavLink'
import { Menu, Transition } from '@headlessui/react'
import { menuTransition } from '@/lib/menuTransition'

export default function TimePicker({ item, itemActive, itemInactive }) {
  const { query, pathname } = useRouter()

  const text = () => {
    if (!query.time) return 'Day'
    return (
      query.time.substring(0, 1).toUpperCase() +
      query.time.substring(1).toLowerCase()
    )
  }

  return (
    <div className="relative inline-block leading-none z-30">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button
              className={`${itemActive} ${item} inline-flex items-center focus:outline-none`}
            >
              {text()}
              <FiChevronDown className="ml-1" />
            </Menu.Button>

            <Transition show={open} {...menuTransition}>
              <Menu.Items
                static
                className="absolute right-0 w-32 origin-top-right bg-white border border-gray-200 dark:border-transparent dark:bg-gray-800 rounded-md shadow-lg outline-none p-3 space-y-3"
              >
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      href={{
                        pathname,
                        query: (() => {
                          const q = { ...query, time: 'hour' }
                          delete q.page
                          return q
                        })()
                      }}
                      shallow
                      className={`block ${item} ${
                        query.time === 'hour' ? itemActive : itemInactive
                      } ${active ? 'underline' : ''}`}
                    >
                      Hour
                    </NavLink>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      href={{
                        pathname,
                        query: (() => {
                          const q = { ...query }
                          delete q.time
                          delete q.page
                          return q
                        })()
                      }}
                      shallow
                      className={`block ${item} ${
                        !query.time || query.time === 'day'
                          ? itemActive
                          : itemInactive
                      } ${active ? 'underline' : ''}`}
                    >
                      Day
                    </NavLink>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      href={{
                        pathname,
                        query: (() => {
                          const q = { ...query, time: 'week' }
                          delete q.page
                          return q
                        })()
                      }}
                      shallow
                      className={`block ${item} ${
                        query.time === 'week' ? itemActive : itemInactive
                      } ${active ? 'underline' : ''}`}
                    >
                      Week
                    </NavLink>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      href={{
                        pathname,
                        query: (() => {
                          const q = { ...query, time: 'month' }
                          delete q.page
                          return q
                        })()
                      }}
                      shallow
                      className={`block ${item} ${
                        query.time === 'month' ? itemActive : itemInactive
                      } ${active ? 'underline' : ''}`}
                    >
                      Month
                    </NavLink>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      href={{
                        pathname,
                        query: (() => {
                          const q = { ...query, time: 'year' }
                          delete q.page
                          return q
                        })()
                      }}
                      shallow
                      className={`block ${item} ${
                        query.time === 'year' ? itemActive : itemInactive
                      } ${active ? 'underline' : ''}`}
                    >
                      Year
                    </NavLink>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      href={{
                        pathname,
                        query: (() => {
                          const q = { ...query, time: 'all' }
                          delete q.page
                          return q
                        })()
                      }}
                      shallow
                      className={`block ${item} ${
                        query.time === 'all' ? itemActive : itemInactive
                      } ${active ? 'underline' : ''}`}
                    >
                      All
                    </NavLink>
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
