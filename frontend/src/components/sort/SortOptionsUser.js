import React from 'react'
import NavLink from '@/components/NavLink'
import { useRouter } from 'next/router'
import TimePicker from '@/components/sort/TimePicker'

const itemActive = 'text-blue-500'
const itemInactive = 'text-tertiary'
const item =
  'select-none text-xl font-bold tracking-tight leading-none cursor-pointer hover:underline'

export default function SortOptionsUser({ user }) {
  const { query, pathname } = useRouter()

  return (
    <div className="flex items-center mb-6">
      <div className="inline-flex items-center space-x-4">
        <NavLink
          href={{
            pathname,
            query: (() => {
              const q = { ...query }
              delete q.time
              delete q.sort
              delete q.page
              return q
            })()
          }}
          shallow
          className={`${
            !query.sort || query.sort === 'new' ? itemActive : itemInactive
          } ${item} `}
        >
          New
        </NavLink>
        <NavLink
          href={{
            pathname,
            query: (() => {
              const q = { ...query, sort: 'top' }
              delete q.page
              return q
            })()
          }}
          shallow
          className={`${
            query.sort === 'top' ? itemActive : itemInactive
          } ${item} `}
        >
          Top
        </NavLink>

        {query.sort === 'top' && (
          <TimePicker
            item={item}
            itemActive={itemActive}
            itemInactive={itemInactive}
          />
        )}
      </div>

      <div className="ml-auto inline-flex items-center space-x-4">
        <NavLink
          href={{
            pathname,
            query: (() => {
              const q = { ...query }
              delete q.view
              delete q.page
              return q
            })()
          }}
          shallow
          className={`${item} ${!query.view ? itemActive : itemInactive}`}
        >
          {user.postCount} Post{user.postCount === 1 ? '' : 's'}
        </NavLink>
        <NavLink
          href={{
            pathname,
            query: (() => {
              const q = { ...query, view: 'comments' }
              delete q.page
              return q
            })()
          }}
          shallow
          className={`${item} ${
            query.view === 'comments' ? itemActive : itemInactive
          }`}
        >
          {user.commentCount} Comment{user.commentCount === 1 ? '' : 's'}
        </NavLink>
      </div>
    </div>
  )
}
