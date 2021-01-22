import { RiFireFill } from 'react-icons/ri'
import { HiSortAscending, HiClock, HiCog, HiChevronDown } from 'react-icons/hi'
import React, { forwardRef } from 'react'
import { useRouter } from 'next/router'
import Logo from '@/components/Logo'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { FiUser, FiUserPlus } from 'react-icons/fi'
import NavLink from '@/components/NavLink'
import Sidebar from '@/components/layout/Sidebar'
import TimePicker from '@/components/sort/TimePicker'
import { CurrentUserInfo } from '@/components/layout/CurrentUserInfo'

export default forwardRef((props, ref) => {
  const { pathname, query } = useRouter()
  return (
    <Sidebar left ref={ref}>
      <CurrentUserInfo />

      <div className="w-full h-12 flex items-center px-4">
        <Logo className="h-4" />
      </div>
      <div className="px-1">
        <div className="sidebar-label">FEED</div>

        <div className="space-y-0.5">
          <NavLink
            href={{
              pathname,
              query: (() => {
                const q = { ...query }
                delete q.time
                delete q.sort
                return q
              })()
            }}
            className={`sidebar-item ${
              !query.sort || query.sort === 'hot' ? 'sidebar-item--active' : ''
            }`}
          >
            <RiFireFill className="w-5 h-5 mr-3" />
            Hot
          </NavLink>

          <NavLink
            href={{
              pathname,
              query: (() => {
                const q = { ...query }
                delete q.time
                q.sort = 'new'
                return q
              })()
            }}
            className={`sidebar-item ${
              query.sort === 'new' ? 'sidebar-item--active' : ''
            }`}
          >
            <HiClock className="w-5 h-5 mr-3" />
            New
          </NavLink>

          <NavLink
            href={{
              pathname,
              query: (() => {
                const q = { ...query }
                q.time = 'day'
                q.sort = 'top'
                return q
              })()
            }}
            className={`sidebar-item ${
              query.sort === 'top' ? 'sidebar-item--active' : ''
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

        <div className="sidebar-label">DIRECT MESSAGES</div>
        <div className="space-y-0.5">
          <div className="sidebar-item sidebar-item--large">
            <FiUserPlus className="w-5 h-5 mr-3" />
            New DM
          </div>
        </div>
      </div>
    </Sidebar>
  )
})
