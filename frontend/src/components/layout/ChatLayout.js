import Sidebar from './Sidebar'
import BottomBar from '@/components/layout/BottomBar'
import React, { useState } from 'react'
import Header from '@/components/layout/Header'
import LoginModal from '@/components/login/LoginModal'
import { Toaster } from 'react-hot-toast'
import PlanetChatLeftSidebar from '@/components/layout/PlanetChatLeftSidebar'
import PlanetChatRightSidebar from '@/components/layout/PlanetChatRightSidebar'
import { FiHome } from 'react-icons/fi'
import Tippy from '@tippyjs/react'
import { usePlanets } from '@/lib/queries/usePlanets'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'

export default function ChatLayout({ children }) {
  const item =
    'flex-shrink-0 inline-flex items-center justify-center w-full h-full rounded-full cursor-pointer hover:shadow-lg'

  const dot =
    'w-12 h-12 object-cover inline-flex items-center justify-center rounded-full dark:bg-gray-800 transform transition hover:scale-125'

  const planets = usePlanets({ joinedOnly: true }).data || []

  return (
    <>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div,
        div#__next > div > div {
          height: 100%;
        }
      `}</style>

      <LoginModal />

      <div className="relative h-full">
        <div className="fixed top-0 bottom-0 left-0 hidescroll overflow-y-auto z-50 flex flex-col items-center w-16 bg-white dark:bg-gray-900 space-y-2">
          <div className="relative h-full w-full py-1">
            <AutoSizer>
              {({ height, width }) => (
                <List
                  height={height}
                  itemCount={planets.length}
                  itemSize={56}
                  width={width}
                  className="hidescroll"
                >
                  {({ index, style }) => {
                    const planet = planets[index]

                    return (
                      <div style={style}>
                        {index === 0 ? (
                          <Tippy content="Home" placement="right">
                            <div className={item}>
                              <div className={dot}>
                                <FiHome className="w-5 h-5 text-tertiary" />
                              </div>
                            </div>
                          </Tippy>
                        ) : (
                          <Tippy
                            key={planet.id}
                            placement="right"
                            content={planet.name}
                          >
                            <div className={item}>
                              {planet.avatarUrl ? (
                                <img
                                  src={planet.avatarUrl}
                                  className={dot}
                                  alt={planet.name}
                                />
                              ) : (
                                <div
                                  className={`${dot} uppercase text-xl font-medium text-tertiary`}
                                >
                                  {planet.name[0]}
                                </div>
                              )}
                            </div>
                          </Tippy>
                        )}
                      </div>
                    )
                  }}
                </List>
              )}
            </AutoSizer>
          </div>
        </div>

        {/*<Header />*/}

        <main className="h-full md:mr-64 md:ml-80">{children}</main>

        <BottomBar />

        {/*<TopBar setSidebarOpen={setSidebarOpen} />*/}

        {/*<RightSidebar />*/}
      </div>
    </>
  )
}
