import { Link, useParams, useLocation } from 'react-router-dom'
import { RiFireFill } from 'react-icons/ri'
import { HiChevronDown, HiClock, HiSortAscending } from 'react-icons/hi'
import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import MenuTransition from '@/components/ui/MenuTransition'

export default function SidebarSortButtons() {
  const query = useParams()
  const location = useLocation()

  const pathname = location.pathname.startsWith('/planet/[planetName]')
    ? '/planet/[planetName]'
    : '/'

  const baseQuery = {}
  if (query.planetName) baseQuery.planetName = query.planetName

  return (
    <div className="space-y-0.5">
      <Link
        to={{
          pathname,
          query: { ...baseQuery }
        }}
        className={`sidebar-item ${
          (!query.sort || query.sort === 'hot') &&
          location.pathname === pathname
            ? 'sidebar-item--active'
            : ''
        }`}
      >
        <RiFireFill className="w-5 h-5 mr-3" />
        Hot
      </Link>

      <Link
        to={{
          pathname,
          query: { sort: 'new', ...baseQuery }
        }}
        className={`sidebar-item ${
          query.sort === 'new' && location.pathname === pathname
            ? 'sidebar-item--active'
            : ''
        }`}
      >
        <HiClock className="w-5 h-5 mr-3" />
        New
      </Link>

      <Link
        to={{
          pathname,
          query: { sort: 'top', time: 'day', ...baseQuery }
        }}
        className={`sidebar-item ${
          query.sort === 'top' && location.pathname === pathname
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
      </Link>
    </div>
  )
}

function TimePicker({ className, children }) {
  const item = ''
  const itemActive = ''
  const itemInactive = ''

  const query = useParams()
  const { pathname } = useLocation()

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

          <MenuTransition show={open}>
            <Menu.Items
              static
              className="absolute right-0 mt-2 w-32 origin-top-right bg-white border border-gray-200 dark:border-transparent dark:bg-gray-800 rounded-md shadow-lg outline-none p-3 space-y-3"
            >
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={{
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
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={{
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
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={{
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
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={{
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
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={{
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
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={{
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
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </MenuTransition>
        </>
      )}
    </Menu>
  )
}
