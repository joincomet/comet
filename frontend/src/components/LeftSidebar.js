import { FiBell, FiLogIn, FiSearch } from 'react-icons/fi'
import { SiDiscord, SiPatreon, SiGithub, SiTwitter } from 'react-icons/si'
import { CgInfinity } from 'react-icons/cg'
import { BiHomeAlt } from 'react-icons/bi'
import NavLink from './NavLink'
import Logo from '@/components/Logo'
import { usePlanets } from '@/hooks/usePlanets'
import Tippy from '@tippyjs/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import { AnimatePresence, motion } from 'framer-motion'

const link =
  'cursor-pointer relative text-xs font-medium dark:hover:bg-gray-900 hover:bg-gray-200 px-6 h-10 flex items-center hover:text-blue-500 dark:hover:text-blue-500 text-tertiary transition'

function LeftSidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 0.75
            }}
            exit={{
              opacity: 0
            }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            onClick={() => setSidebarOpen(false)}
            className={`z-20 fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-gray-900`}
          />
        )}
      </AnimatePresence>
      <nav
        className={`w-nav pb-16 fixed z-30 flex flex-col overflow-y-auto bg-white dark:bg-gray-800 shadow-lg min-h-full h-full transform transition ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
      >
        <CometXLinks />

        <Scrollbar>
          <div className="mx-5 pt-3 pb-3 mb-2 border-b border-gray-200 dark:border-gray-700 flex flex-row items-center">
            <NavLink href="/" className="ml-1.5 mr-auto">
              <Logo className="w-32 dark:text-gray-200 text-black" />
            </NavLink>
            <NavLink
              href="/notifications"
              className="ml-4 hover:scale-125 transform duration-150 ease-in-out text-tertiary rounded-full hover:bg-gray-700 transition w-9 h-9 p-2"
            >
              <FiBell className="w-5 h-5" />
            </NavLink>
          </div>
          <div className="text-gray-500">
            <NavLink href="/" className={`${link} navitem-active`}>
              <BiHomeAlt className="w-5 h-5" />
              <span className="ml-6">Home</span>
            </NavLink>
            <NavLink href="/universe" className={link}>
              <CgInfinity className="w-5 h-5" />
              <span className="ml-6">Universe</span>
            </NavLink>

            <NavLink href="/login" className={link}>
              <FiLogIn className="w-5 h-5 text-blue-500" />
              <span className="ml-6 text-blue-500">Log In/Sign Up</span>
            </NavLink>
          </div>

          <TopPlanets />
        </Scrollbar>
      </nav>
    </>
  )
}

function CometXLinks() {
  const link =
    'rounded-full inline-flex place-items-center h-10 w-10 transition hover:bg-gray-200 dark:hover:bg-gray-700'

  return (
    <div className="fixed z-10 bottom-0 left-0 w-nav bg-white dark:bg-gray-800">
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

const planetClass =
  'cursor-pointer relative text-xs font-medium dark:hover:bg-gray-900 hover:bg-gray-200 px-6 h-8 flex items-center hover:text-blue-500 dark:hover:text-blue-500 text-gray-600 dark:text-gray-400 transition'

function TopPlanets() {
  const { isLoading, isError, data, error } = usePlanets({
    sort: 'TOP',
    pageSize: 50
  })

  if (isLoading || isError) return null

  return (
    <div className="mt-3 h-full">
      <div className="mx-5 px-3 border-b dark:border-gray-700 relative mb-3">
        <div className="h-8 absolute left-0 top-0 bottom-0 inline-flex items-center ml-1.5">
          <FiSearch size={16} className="text-disabled" />
        </div>

        <input
          type="text"
          placeholder="Search planets"
          className="w-full h-8 text-xs bg-transparent border-none font-medium focus:ring-0 pl-6 pr-3"
        />
      </div>

      {data.map(planet => (
        <NavLink
          className={planetClass}
          key={planet.id}
          href="/+[planet]"
          as={`/+${planet.name}`}
        >
          {planet.avatarURL ? (
            <Image
              width={20}
              height={20}
              src={planet.avatarURL}
              className="w-5 h-5 rounded-full"
              alt={planet.name}
            />
          ) : (
            <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700" />
          )}

          <span className="ml-3">{planet.name}</span>
        </NavLink>
      ))}
    </div>
  )
}

export default LeftSidebar
