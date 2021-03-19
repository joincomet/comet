import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import UserAvatar from '@/components/avatars/UserAvatar'
import Tippy from '@tippyjs/react'
import { IconChat, IconDotsVertical } from '@/lib/Icons'

export default function FriendListItem({ friend }) {
  const { push } = useHistory()
  return (
    <div className="px-2 dark:hover:bg-gray-725 rounded-lg">
      <div
        onClick={e => {
          e.stopPropagation()
          push(`/dm/${friend.id}`)
        }}
        className="h-16 py-2 flex items-center cursor-pointer group border-t dark:border-gray-700"
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
          <Link
            to={`/dm/${friend.id}`}
            className="ml-auto rounded-full dark:bg-gray-800 h-9 w-9 flex items-center justify-center"
          >
            <IconChat className="w-5 h-5 text-tertiary" />
          </Link>
        </Tippy>

        <Tippy content="More">
          <div className="ml-3 rounded-full dark:bg-gray-800 h-9 w-9 flex items-center justify-center">
            <IconDotsVertical className="w-5 h-5 text-tertiary" />
          </div>
        </Tippy>
      </div>
    </div>
  )
}
