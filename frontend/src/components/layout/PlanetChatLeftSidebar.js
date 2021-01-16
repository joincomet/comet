import { FiHash, FiClock, FiCha } from 'react-icons/fi'
import { RiFireFill } from 'react-icons/ri'
import { HiSortAscending, HiClock, HiHashtag, HiFire } from 'react-icons/hi'
import { BiHomeAlt } from 'react-icons/bi'
import NavLink from '../NavLink'
import Logo from '@/components/Logo'
import React, { useEffect, useState } from 'react'
import RSC from 'react-scrollbars-custom'
import { AnimatePresence, motion } from 'framer-motion'
import { useCurrentUser } from '@/lib/queries/useCurrentUser'
import { useHeaderStore } from '@/lib/stores/useHeaderStore'
import { useRouter } from 'next/router'

const link =
  'rounded cursor-pointer inline-flex items-center text-tertiary text-sm font-medium px-4 w-full py-2 transition dark:hover:bg-gray-800'

const label =
  'px-4 pt-6 pb-2 text-tertiary uppercase text-xs font-semibold tracking-widest'

export default function PlanetChatLeftSidebar({ planet }) {
  const currentUser = useCurrentUser().data

  const { sidebar, setSidebar } = useHeaderStore()

  const { query, pathname } = useRouter()

  useEffect(() => setSidebar(false), [query, pathname])

  return (
    <>
      <AnimatePresence>
        {sidebar && (
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
            onClick={() => setSidebar(false)}
            className={`z-30 fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-gray-900`}
          />
        )}
      </AnimatePresence>
      <nav
        className={`sidebar left-16 ${
          sidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div
          className="h-36 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${planet.bannerUrl})` }}
        ></div>

        <div className="px-1">
          <div className={label}>POSTS</div>

          <div className={link}>
            <RiFireFill className="w-5 h-5 mr-3" />
            Hot
          </div>

          <div className={link}>
            <HiClock className="w-5 h-5 mr-3" />
            New
          </div>

          <div className={link}>
            <HiSortAscending className="w-5 h-5 mr-3" />
            Top
          </div>

          <div className={label}>CHANNELS</div>

          {planet.channels.map(channel => (
            <div key={channel.id} className={link}>
              <HiHashtag className="w-5 h-5 mr-3" />
              {channel.name}
            </div>
          ))}
        </div>
      </nav>
    </>
  )
}
