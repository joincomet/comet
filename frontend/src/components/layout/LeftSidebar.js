import { FiBell, FiLogIn, FiSearch } from 'react-icons/fi'
import { SiDiscord, SiPatreon, SiGithub, SiTwitter } from 'react-icons/si'
import { CgInfinity } from 'react-icons/cg'
import { BiHomeAlt } from 'react-icons/bi'
import NavLink from '../NavLink'
import Logo from '@/components/Logo'
import { usePlanets } from '@/lib/queries/usePlanets'
import Tippy from '@tippyjs/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import TelescopeIcon from '@/TelescopeIcon'
import PlanetAvatar from '@/components/planet/PlanetAvatar'

const link =
  'cursor-pointer relative text-xs font-medium dark:hover:bg-gray-900 hover:bg-gray-200 px-6 h-10 flex items-center hover:text-blue-500 dark:hover:text-blue-500 text-tertiary transition'

function LeftSidebar({ sidebarOpen, setSidebarOpen }) {
  const currentUser = useCurrentUser().data

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
        className={`w-64 top-0 bottom-0 left-0 fixed z-50 flex flex-col overflow-y-auto bg-white dark:bg-gray-900 transform transition ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <Scrollbar
          thumbYProps={{
            style: { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
          }}
        >
          <NavLink href="/" className="flex items-center h-14 px-4">
            <Logo className="h-4 dark:text-gray-200 text-black" />
            <div className="text-xs font-semibold ml-3 mt-2 text-tertiary uppercase tracking-widest">
              alpha
            </div>
          </NavLink>
          <div className="text-gray-500">
            <NavLink href="/" className={`${link} navitem-active`}>
              <BiHomeAlt className="w-5 h-5" />
              <span className="ml-6">Home</span>
            </NavLink>
            <NavLink href="/universe" className={link}>
              <CgInfinity className="w-5 h-5" />
              <span className="ml-6">Universe</span>
            </NavLink>
            <NavLink href="/explore" className={link}>
              <TelescopeIcon className="w-5 h-5" />
              <span className="ml-6">Explore Planets</span>
            </NavLink>
          </div>

          <TopPlanets />
        </Scrollbar>
      </nav>
    </>
  )
}

const colors = [
  'hover:text-red-500 dark:hover:text-red-500',
  'hover:text-amber-500 dark:hover:text-amber-500',
  'hover:text-green-500 dark:hover:text-green-500',
  'hover:text-blue-500 dark:hover:text-blue-500',
  'hover:text-purple-500 dark:hover:text-purple-500',
  'hover:text-pink-500 dark:hover:text-pink-500'
]

const planetClass =
  'cursor-pointer relative text-xs font-medium dark:hover:bg-gray-900 hover:bg-gray-200 px-6 h-8 flex items-center text-gray-600 dark:text-gray-400 transition'

function TopPlanets() {
  const currentUser = useCurrentUser().data

  const { isLoading, isError, data, error } = usePlanets({
    sort: 'TOP',
    joinedOnly: !!currentUser
  })

  if (isLoading || isError) return null

  return (
    <div className="py-3 h-full">
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

      <NavLink
        className={`${planetClass} text-tertiary hover:text-blue-500 dark:hover:text-blue-500 transition`}
        href={`/createplanet`}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M17 14H19V17H22V19H19V22H17V19H14V17H17V14M20 12C20 8.64 17.93 5.77 15 4.59V5C15 6.1 14.1 7 13 7H11V9C11 9.55 10.55 10 10 10H8V12H14C14.5 12 14.9 12.35 15 12.81C13.2 13.85 12 15.79 12 18C12 19.5 12.54 20.85 13.44 21.9L12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12L21.9 13.44C21.34 12.96 20.7 12.59 20 12.34L20 12M11 19.93V18C9.9 18 9 17.1 9 16V15L4.21 10.21C4.08 10.78 4 11.38 4 12C4 16.08 7.06 19.44 11 19.93Z"
          />
        </svg>
        <span className="ml-3">Create a Planet</span>
      </NavLink>

      {data.map((planet, index) => (
        <NavLink
          className={`${planetClass} ${colors[index % colors.length]}`}
          key={planet.id}
          href={`/planet/${planet.name}`}
        >
          <PlanetAvatar className="w-5 h-5" planet={planet} />

          <span className="ml-3">{planet.name}</span>
        </NavLink>
      ))}
    </div>
  )
}

export default LeftSidebar
