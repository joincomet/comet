import { HiSortAscending, HiClock, HiCheckCircle } from 'react-icons/hi'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useHeaderStore } from '@/lib/stores/useHeaderStore'
import { useRouter } from 'next/router'
import { galaxiesMap } from '@/lib/galaxiesMap'
import { Scrollbars } from 'rc-scrollbars'
import AutoSizer from 'react-virtualized-auto-sizer'

export default function ExploreLeftSidebar() {
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
        <div className="relative h-full w-full">
          <AutoSizer>
            {({ width, height }) => (
              <Scrollbars style={{ width, height }}>
                <div className="px-1 py-6">
                  <div className="px-4 pb-6 text-lg font-semibold leading-none text-white">
                    Explore Planets
                  </div>

                  <div className="sidebar-item">
                    <HiCheckCircle className="w-5 h-5 mr-3" />
                    Featured
                  </div>

                  <div className="sidebar-item">
                    <HiSortAscending className="w-5 h-5 mr-3" />
                    Most Popular
                  </div>

                  <div className="sidebar-item">
                    <HiClock className="w-5 h-5 mr-3" />
                    Recently Created
                  </div>

                  <div className="sidebar-label">GALAXIES</div>

                  {Object.keys(galaxiesMap)
                    .sort((a, b) => a.localeCompare(b))
                    .map(key => (
                      <div key={key} className="sidebar-item">
                        {galaxiesMap[key]}
                      </div>
                    ))}
                </div>
              </Scrollbars>
            )}
          </AutoSizer>
        </div>
      </nav>
    </>
  )
}
