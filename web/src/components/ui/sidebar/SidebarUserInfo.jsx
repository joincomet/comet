import { useCurrentUser } from '@comet/core/queries/useCurrentUser'
import { FiUser } from 'react-icons/fi'
import { HiCog, HiUserAdd } from 'react-icons/hi'
import React from 'react'
import Tippy from '@tippyjs/react'

export function SidebarUserInfo() {
  const currentUser = useCurrentUser().data

  return (
    <div className="fixed bottom-0 left-16 right-0 w-60 h-12 px-3 dark:bg-gray-850 flex items-center">
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
        /*<div className="flex items-center text-sm text-secondary flex-grow">
          Log In/Sign Up
          <svg
            className="w-5 h-5 ml-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>*/
        <div className="grid grid-cols-2 gap-3 py-2 h-full">
          <div
            className="flex items-center border dark:border-gray-750 px-3 h-full whitespace-nowrap rounded text-sm text-accent cursor-pointer select-none
          "
          >
            Log In
            <svg
              className="w-5 h-5 ml-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex items-center px-3 h-full whitespace-nowrap rounded text-sm bg-blue-600 cursor-pointer select-none">
            Sign Up
            <HiUserAdd className="w-5 h-5 ml-3" />
          </div>
        </div>
      )}
    </div>
  )
}
