import NavLink from '@/components/NavLink'
import { RiFireFill } from 'react-icons/ri'
import { HiChevronDown, HiClock, HiSortAscending } from 'react-icons/hi'
import React from 'react'
import { useRouter } from 'next/router'
import { Menu, Transition } from '@headlessui/react'
import { menuTransition } from '@/lib/menuTransition'

export default function PostSortButtons() {
  const router = useRouter()
  let { pathname, query } = router

  pathname = pathname.startsWith('/planet/[planetname]')
    ? '/planet/[planetname]'
    : '/'

  const baseQuery = {}
  if (query.planetname) baseQuery.planetname = query.planetname

  return (
    <div className="space-y-0.5">
      <NavLink
        href={{
          pathname,
          query: { ...baseQuery }
        }}
        className={`sidebar-item ${
          (!query.sort || query.sort === 'hot') && router.pathname === pathname
            ? 'sidebar-item--active'
            : ''
        }`}
      >
        <RiFireFill className="w-5 h-5 mr-3" />
        Hot
      </NavLink>

      <NavLink
        href={{
          pathname,
          query: { sort: 'new', ...baseQuery }
        }}
        className={`sidebar-item ${
          query.sort === 'new' && router.pathname === pathname
            ? 'sidebar-item--active'
            : ''
        }`}
      >
        <HiClock className="w-5 h-5 mr-3" />
        New
      </NavLink>

      <NavLink
        href={{
          pathname,
          query: { sort: 'top', time: 'day', ...baseQuery }
        }}
        className={`sidebar-item ${
          query.sort === 'top' && router.pathname === pathname
            ? 'sidebar-item--active'
            : ''
        }`}
      >
        <div className="inline-flex items-center h-full">
          <HiSortAscending className="w-5 h-5 mr-3" />
          Top
        </div>

        {query.sort === 'top' && (
          <TimePicker className="ml-auto h-full inline-flex items-center focus:outline-none min-h-full">
            <div className="mr-3 text-xs">
              {query.time
                ? `${
                    query.time.substring(0, 1).toUpperCase() +
                    query.time.substring(1).toLowerCase()
                  }`
                : 'Day'}
            </div>
            <HiChevronDown className="w-5 h-5" />
          </TimePicker>
        )}
      </NavLink>
    </div>
  )
}

function TimePicker({ className, children }) {
  const item = ''
  const itemActive = ''
  const itemInactive = ''

  const { query, pathname } = useRouter()

  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
            }}
            className={className}
          >
            {children}
          </Menu.Button>

          <Transition show={open} {...menuTransition}>
            <Menu.Items
              static
              className="absolute right-0 mt-2 w-32 origin-top-right bg-white border border-gray-200 dark:border-transparent dark:bg-gray-800 rounded-md shadow-lg outline-none p-3 space-y-3"
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
  )
}
