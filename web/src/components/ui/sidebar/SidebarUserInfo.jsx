import { HiCog, HiUser } from 'react-icons/hi'
import React from 'react'
import Tippy from '@tippyjs/react'
import { useUser } from '@/lib/useUser'

export function SidebarUserInfo() {
  const { user: currentUser } = useUser()

  return (
    <div className="fixed bottom-0 left-16 right-0 w-60 h-12 px-3 dark:bg-gray-850 flex items-center">
      <div className="h-8 w-8 relative rounded-full dark:bg-gray-800 inline-flex items-center justify-center">
        {currentUser.avatarUrl ? (
          <img
            src={currentUser.avatarUrl}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <HiUser className="w-5 h-5 text-mid" />
        )}
      </div>

      <div className="ml-3">
        <div className="text-sm text-primary font-medium">
          {currentUser.name}
        </div>
        <div className="text-xs text-tertiary font-medium">
          #{currentUser.tag}
        </div>
      </div>

      <Tippy content="Settings">
        <div className="p-1.5 rounded dark:hover:bg-gray-750 transition cursor-pointer ml-auto">
          <HiCog className="w-5 h-5 text-tertiary" />
        </div>
      </Tippy>
    </div>
  )
}
