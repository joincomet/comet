import { useRouter } from 'next/router'
import NavLink from '@/components/ui/NavLink'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import React from 'react'

export default function PageNavigator({ nextEnabled = true }) {
  const { query, pathname } = useRouter()

  const backEnabled = query.page && query.page > 1

  return (
    <>
      {(nextEnabled || backEnabled) && (
        <div className="h-16 flex items-center justify-center text-secondary border-t border-gray-200 dark:border-gray-700 dark:bg-gray-775">
          {backEnabled ? (
            <NavLink
              href={{
                pathname,
                query: (() => {
                  const q = { ...query, page: parseInt(query.page) - 1 }
                  if (q.page === 1) delete q.page
                  return q
                })()
              }}
              className={`pagebutton`}
            >
              <HiChevronLeft className="h-5 w-5" />
            </NavLink>
          ) : (
            <div className={`flex-grow`} />
          )}

          <div className="flex h-full items-center justify-center flex-grow-0 w-32 text-base text-secondary">
            Page {query.page || 1}
          </div>

          {nextEnabled ? (
            <NavLink
              href={{
                pathname,
                query: {
                  ...query,
                  page: query.page ? parseInt(query.page) + 1 : 2
                }
              }}
              className={`pagebutton`}
            >
              <HiChevronRight className="h-5 w-5" />
            </NavLink>
          ) : (
            <div className={`flex-grow`}></div>
          )}
        </div>
      )}
    </>
  )
}
