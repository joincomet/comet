import { useCurrentUser } from '@comet/core/queries/useCurrentUser'
import { FiUser } from 'react-icons/fi'
import { HiCog } from 'react-icons/hi'
import React from 'react'
import Tippy from '@tippyjs/react'

export function SidebarUserInfo() {
  const currentUser = useCurrentUser().data

  return (
    <div className="fixed bottom-0 left-16 right-0 w-60 h-12 px-3 dark:bg-gray-850 inline-flex items-center">
      {currentUser ? (
        <>
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

          <Tippy content="Settings">
            <div className="p-1.5 rounded dark:hover:bg-gray-750 transition cursor-pointer ml-auto">
              <HiCog className="w-5 h-5 text-tertiary" />
            </div>
          </Tippy>
        </>
      ) : (
        <div>LOG IN!</div>
      )}
    </div>
  )
}
