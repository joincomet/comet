import React, { useEffect, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { useClickAway } from 'react-use'
import { useRouter } from 'next/router'
import { FiChevronDown, FiMoreHorizontal } from 'react-icons/fi'
import ReactDOM from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
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
    <div className="relative z-30">
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
                <Menu.Item
                  className={`block ${item} ${
                    query.time === 'hour' ? itemActive : itemInactive
                  }`}
                >
                  <NavLink
                    href={{ pathname, query: { ...query, time: 'hour' } }}
                  >
                    Hour
                  </NavLink>
                </Menu.Item>

                <Menu.Item
                  className={`block ${item} ${
                    !query.time || query.time === 'day'
                      ? itemActive
                      : itemInactive
                  }`}
                >
                  <NavLink
                    href={{
                      pathname,
                      query: (() => {
                        const q = { ...query }
                        delete q.time
                        return q
                      })()
                    }}
                  >
                    Day
                  </NavLink>
                </Menu.Item>

                <Menu.Item
                  className={`block ${item} ${
                    query.time === 'week' ? itemActive : itemInactive
                  }`}
                >
                  <NavLink
                    href={{ pathname, query: { ...query, time: 'week' } }}
                  >
                    Week
                  </NavLink>
                </Menu.Item>

                <Menu.Item
                  className={`block ${item} ${
                    query.time === 'month' ? itemActive : itemInactive
                  }`}
                >
                  <NavLink
                    href={{ pathname, query: { ...query, time: 'month' } }}
                  >
                    Month
                  </NavLink>
                </Menu.Item>

                <Menu.Item
                  className={`block ${item} ${
                    query.time === 'year' ? itemActive : itemInactive
                  }`}
                >
                  <NavLink
                    href={{ pathname, query: { ...query, time: 'year' } }}
                  >
                    Year
                  </NavLink>
                </Menu.Item>

                <Menu.Item
                  className={`block ${item} ${
                    query.time === 'all' ? itemActive : itemInactive
                  }`}
                >
                  <NavLink
                    href={{ pathname, query: { ...query, time: 'all' } }}
                  >
                    All
                  </NavLink>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}
