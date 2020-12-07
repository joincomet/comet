import { FiLogIn, FiUser, FiMoon, FiSun } from 'react-icons/fi'
import { SiDiscord, SiGithub, SiPatreon, SiTwitter } from 'react-icons/si'
import { HiCog } from 'react-icons/hi'
import Tippy from '@tippyjs/react'
import React from 'react'
import Folders from '@/components/right-sidebar/folders/Folders'
import ToggleTheme from '@/components/ToggleTheme'
import Image from 'next/image'
import { useCurrentUser } from '@/lib/useCurrentUser'
import NavLink from '@/components/NavLink'
import { useTheme } from '@/components/ThemeContext'
import Dropdown from '@/components/Dropdown'

const link =
  'cursor-pointer relative text-xs font-medium dark:hover:bg-gray-900 hover:bg-gray-200 px-6 h-10 flex items-center hover:text-blue-500 dark:hover:text-blue-500 text-tertiary transition'

export default function RightSidebar() {
  const currentUser = useCurrentUser().data

  return (
    <nav className="w-nav fixed top-0 right-0 z-20 flex flex-col hidden h-full min-h-full overflow-y-auto bg-white shadow-lg dark:bg-gray-800 sm:block">
      <div className="relative">
        <CometXLinks />

        <UserInfo />

        <div className="mt-6">
          <Folders />
        </div>

        <ToggleTheme />
      </div>
    </nav>
  )
}

const userInfoItem =
  'text-tertiary font-medium hover:text-blue-500 dark:hover:text-blue-500 transition'

function UserInfo() {
  const currentUser = useCurrentUser().data

  const { theme, toggleTheme } = useTheme()

  if (!currentUser)
    return (
      <div>
        <NavLink
          href="/?login=true"
          as="/login"
          shallow
          className={link}
          scroll={false}
        >
          <FiLogIn className="w-5 h-5 text-blue-500" />
          <span className="ml-6 text-blue-500">Log In/Sign Up</span>
        </NavLink>
      </div>
    )

  return (
    <div className="dark:bg-gray-900 transition cursor-pointer px-6 py-3 rounded-md m-3 shadow-inner">
      <div className="flex items-center">
        <div className="relative w-12 h-12 rounded-full dark:bg-gray-700 inline-flex shadow">
          {currentUser.profile.avatarUrl ? (
            <Image
              src={currentUser.profile.avatarUrl}
              layout="fill"
              className="object-cover object-center"
            />
          ) : (
            <FiUser className="h-1/2 w-1/2 text-mid m-auto" />
          )}

          <div className="absolute bottom-0 right-0 z-10 w-1/4 h-1/4 bg-green-500 rounded-full ring-4 dark:ring-gray-900" />
        </div>

        <div className="ml-4 font-medium">
          <div className="text-primary">
            {currentUser.profile.realName || currentUser.username}&nbsp;
          </div>
          <div className="text-tertiary text-xs mt-0.5">
            @{currentUser.username}
          </div>
        </div>

        <Dropdown
          button={
            <Tippy placement="left" content="Settings">
              <div className="ml-auto -mr-3 p-3 transition hover:bg-gray-800 rounded-full">
                <HiCog className="w-4 h-4 text-tertiary" />
              </div>
            </Tippy>
          }
          buttonClassName="focus:outline-none ml-auto"
        >
          <div className="bg-gray-800 rounded-md shadow-lg">
            <div
              onClick={toggleTheme}
              className="mt-3 pt-3 text-xs flex items-center text-tertiary cursor-pointer font-medium hover:text-blue-500 dark:hover:text-blue-500 transition"
            >
              {theme === 'dark' ? (
                <FiMoon className="w-5 h-5 mr-6" />
              ) : (
                <FiSun className="w-5 h-5 mr-6" />
              )}
              {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </div>
          </div>
        </Dropdown>
      </div>
      <div className="flex mt-3 justify-between">
        <div className={userInfoItem}>
          <div className="text-base text-accent">
            {currentUser.postCount || 0}
          </div>
          <div className="text-xs">Posts</div>
        </div>

        <div className={userInfoItem}>
          <div className="text-base text-accent">
            {currentUser.followerCount || 0}
          </div>
          <div className="text-xs">Followers</div>
        </div>

        <div className={userInfoItem}>
          <div className="text-base text-accent">
            {currentUser.rocketCount || 0}
          </div>
          <div className="text-xs">Rockets</div>
        </div>
      </div>

      {/*<div className="mt-3 pt-3 -mx-2 px-2 border-t border-gray-700 text-xs flex items-center text-tertiary cursor-pointer font-medium hover:text-blue-500 dark:hover:text-blue-500 transition">
        <svg className="w-5 h-5 mr-6" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M17 14H19V17H22V19H19V22H17V19H14V17H17V14M20 12C20 8.64 17.93 5.77 15 4.59V5C15 6.1 14.1 7 13 7H11V9C11 9.55 10.55 10 10 10H8V12H14C14.5 12 14.9 12.35 15 12.81C13.2 13.85 12 15.79 12 18C12 19.5 12.54 20.85 13.44 21.9L12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12L21.9 13.44C21.34 12.96 20.7 12.59 20 12.34L20 12M11 19.93V18C9.9 18 9 17.1 9 16V15L4.21 10.21C4.08 10.78 4 11.38 4 12C4 16.08 7.06 19.44 11 19.93Z"
          />
        </svg>
        Create a Planet
      </div>*/}
    </div>
  )
}

function CometXLinks() {
  const link =
    'rounded-full inline-flex place-items-center h-10 w-10 transition hover:bg-gray-200 dark:hover:bg-gray-700'

  return (
    <div className="fixed z-10 bottom-0 right-0 w-nav bg-white dark:bg-gray-800">
      <div className="h-12 flex items-center justify-between mx-5 border-gray-200 dark:border-gray-700 border-t">
        <Tippy content="CometX Discord Server">
          <a
            href="https://discord.gg/NPCMGSm"
            target="_blank"
            rel="noopener noreferrer"
            className={`${link} relative`}
          >
            <div
              className="absolute inset-center w-2.5 h-2.5"
              style={{ backgroundColor: '#F5F5F5' }}
            />
            <SiDiscord
              className="w-4 h-4 mx-auto z-10"
              style={{ color: '#7289DA' }}
            />
          </a>
        </Tippy>

        <Tippy content="CometX on Patreon">
          <a
            href="https://www.patreon.com/cometx"
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            <SiPatreon
              className="w-4 h-4 mx-auto"
              style={{ color: '#F96854' }}
            />
          </a>
        </Tippy>

        <Tippy content="@cometx_io on Twitter">
          <a
            href="https://twitter.com/CometX_io"
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            <SiTwitter
              className="w-4 h-4 mx-auto"
              style={{ color: '#1DA1F2' }}
            />
          </a>
        </Tippy>

        <Tippy content="CometX on GitHub">
          <a
            href="https://github.com/comet-app/cometx"
            target="_blank noreferrer"
            rel="noopener"
            className={link}
          >
            <SiGithub className="w-4 h-4 mx-auto text-black dark:text-white" />
          </a>
        </Tippy>
      </div>
    </div>
  )
}
