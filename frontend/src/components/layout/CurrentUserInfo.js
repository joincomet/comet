import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { FiUser } from 'react-icons/fi'
import { HiCog } from 'react-icons/hi'
import React from 'react'

export function CurrentUserInfo() {
  const currentUser = useCurrentUser().data

  return (
    <div className="h-full flex items-end">
      <div className="sticky bottom-0 left-0 right-0 w-60 h-12 px-3 dark:bg-gray-850 inline-flex items-center">
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

            <div className="p-1.5 rounded dark:hover:bg-gray-750 transition cursor-pointer ml-auto">
              <HiCog className="w-5 h-5 text-tertiary" />
            </div>
          </>
        ) : (
          <div>LOG IN!</div>
        )}
      </div>
    </div>
  )
}
