import { FiLogIn, FiUser } from 'react-icons/fi'
import { SiDiscord, SiGithub, SiPatreon, SiTwitter } from 'react-icons/si'
import Tippy from '@tippyjs/react'
import React from 'react'
import Folders from '@/components/right-sidebar/folders/Folders'
import ToggleTheme from '@/components/ToggleTheme'
import Image from 'next/image'
import { useCurrentUser } from '@/lib/useCurrentUser'
import NavLink from '@/components/NavLink'

const link =
  'cursor-pointer relative text-xs font-medium dark:hover:bg-gray-900 hover:bg-gray-200 px-6 h-10 flex items-center hover:text-blue-500 dark:hover:text-blue-500 text-tertiary transition'

export default function RightSidebar() {
  const currentUser = useCurrentUser().data

  return (
    <nav className="w-nav fixed top-0 right-0 z-20 flex flex-col hidden h-full min-h-full overflow-y-auto bg-white shadow-lg dark:bg-gray-800 sm:block">
      <div className="relative pt-3">
        <CometXLinks />

        {currentUser ? (
          <div className="mb-3 border-b dark:border-gray-700 py-3 mx-5">
            <div className="flex flex-col items-center">
              <div className="relative">
                {currentUser.profile.avatarURL ? (
                  <Image
                    src={currentUser.profile.avatarUrl}
                    size={96}
                    className="object-cover object-center w-24 h-24 rounded-full"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full dark:bg-gray-700 inline-flex">
                    <FiUser size={48} className="text-disabled m-auto" />
                  </div>
                )}

                <div className="absolute bottom-0 right-0 z-10 w-5 h-5 bg-green-500 rounded-full ring-4 dark:ring-gray-800" />
              </div>

              <div className="mt-3 text-lg font-medium">
                {currentUser.profile.realName || currentUser.username}&nbsp;
                <span className="text-tertiary">@{currentUser.username}</span>
              </div>
            </div>
          </div>
        ) : (
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
        )}

        {currentUser && (
          <div className="text-xs flex items-center text-tertiary cursor-pointer transition dark:hover:bg-gray-900 px-6 h-10 font-medium hover:text-blue-500 dark:hover:text-blue-500">
            <svg className="w-5 h-5 mr-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M17 14H19V17H22V19H19V22H17V19H14V17H17V14M20 12C20 8.64 17.93 5.77 15 4.59V5C15 6.1 14.1 7 13 7H11V9C11 9.55 10.55 10 10 10H8V12H14C14.5 12 14.9 12.35 15 12.81C13.2 13.85 12 15.79 12 18C12 19.5 12.54 20.85 13.44 21.9L12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12L21.9 13.44C21.34 12.96 20.7 12.59 20 12.34L20 12M11 19.93V18C9.9 18 9 17.1 9 16V15L4.21 10.21C4.08 10.78 4 11.38 4 12C4 16.08 7.06 19.44 11 19.93Z"
              />
            </svg>
            {/*<BiPlanet size={20} className="mr-6" />*/}
            Create a Planet
          </div>
        )}

        <div className="mt-6">
          <Folders />
        </div>

        <ToggleTheme />
      </div>
    </nav>
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
