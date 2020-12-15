import React, { useEffect, useState } from 'react'
import { FiSearch, FiBell, FiUser } from 'react-icons/fi'
import Logo from '@/components/Logo'
import NavLink from '@/components/NavLink'
import { useCurrentUser } from '@/lib/useCurrentUser'
import Image from 'next/image'
import UserAvatar from '@/components/user/UserAvatar'

export default function PermanentHeader({ children, className, ...rest }) {
  const currentUser = useCurrentUser().data

  return (
    <>
      <header
        className={`hidden sm:flex z-50 fixed left-0 lg:left-64 right-0 top-0 h-14 items-center transition bg-transparent px-6`}
        {...rest}
      >
        {/*<NavLink href="/">
          <Logo className="h-4 dark:text-gray-200 text-black" />
        </NavLink>

        <div className="text-xl font-bold tracking-tight absolute left-64 pl-6">
          Home Feed
        </div>*/}

        <div className="relative text-gray-600 dark:text-gray-400 focus-within:text-blue-500 dark:focus-within:text-blue-500 transition">
          <FiSearch className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input className="h-8 text-sm rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none text-primary px-10 w-48" />
        </div>

        <div className="ml-auto">
          {currentUser ? (
            <div className="flex items-center space-x-6">
              <div className="p-3 rounded-full transition bg-transparent dark:hover:bg-gray-700 cursor-pointer">
                <FiBell className="w-5 h-5" />
              </div>

              <div className="inline-flex items-center">
                <UserAvatar user={currentUser} />
                <div className="ml-3 text-sm">{currentUser.name}</div>
              </div>
            </div>
          ) : (
            <NavLink
              href="/?login=true"
              as="/login"
              shallow
              scroll={false}
              className="h-9 bg-blue-500 transition hover:bg-blue-600 px-4 inline-flex items-center rounded-md text-sm font-medium cursor-pointer"
            >
              Log In / Sign Up
            </NavLink>
          )}
        </div>
      </header>
    </>
  )
}
