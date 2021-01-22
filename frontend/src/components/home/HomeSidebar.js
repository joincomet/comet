import { RiFireFill } from 'react-icons/ri'
import { HiSortAscending, HiClock } from 'react-icons/hi'
import React, { forwardRef } from 'react'
import { useRouter } from 'next/router'
import Logo from '@/components/Logo'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { FiUser, FiUserPlus } from 'react-icons/fi'
import NavLink from '@/components/NavLink'

export default forwardRef((props, ref) => {
  const currentUser = useCurrentUser().data

  const { pathname, query } = useRouter()
  return (
    <div
      ref={ref}
      className="slideout-menu md:z-10 left-0 ml-16 top-0 w-60 bg-gray-200 dark:bg-gray-800 h-full"
    >
      {currentUser && (
        <div className="fixed bottom-0 left-0 ml-16 w-60 h-12 px-3 dark:bg-gray-850 right-0 inline-flex items-center">
          <div className="h-8 w-8 relative rounded-full dark:bg-gray-800 inline-flex items-center justify-center">
            {currentUser.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <FiUser className="w-5 h-5 text-mid" />
            )}
          </div>

          <div className="text-sm text-primary font-medium ml-3">
            {currentUser.username}
          </div>
        </div>
      )}

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
              !query.sort || query.sort === 'hot'
                ? 'dark:bg-gray-750 text-secondary'
                : 'text-tertiary'
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
              query.sort === 'new'
                ? 'dark:bg-gray-750 text-secondary'
                : 'text-tertiary'
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
              query.sort === 'top'
                ? 'dark:bg-gray-750 text-secondary'
                : 'text-tertiary'
            }`}
          >
            <HiSortAscending className="w-5 h-5 mr-3" />
            Top
          </NavLink>
        </div>

        <div className="sidebar-label">DIRECT MESSAGES</div>
        <div className="flex h-12 items-center px-4 text-mid text-sm font-medium cursor-pointer transition dark:hover:bg-gray-750 rounded">
          <FiUserPlus className="w-5 h-5 mr-3" />
          New DM
        </div>
      </div>
    </div>
  )
})
